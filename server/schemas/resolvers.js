const { AuthenticationError } = require('apollo-server-express');
const { User, Campaign, News, Product, Order } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        users: async () => {
            return User.find()
        },
        user: async (parent, { username }) => {
            return User.findOne({ username })
        },
        campaigns: async () => {
            return Campaign.find().sort({ createdAt: -1 })
        },
        campaign: async (parent, { campaignId }) => {
            return Campaign.findOne({ _id: campaignId })
        },
        products: async (parent, { category }) => {
            const params = category ? { category } : {}
            return Product.find(params)
        },
        product: async (parent, { productId }) => {
            return Product.findOne({ _id: productId })
        },
        allNews: async () => {
            return News.find().sort({ createdAt: -1 })
        },
        news: async (parent, { newsId }) => {
            return News.findOne({ _id: newsId })
        },
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id });
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        orders: async (parent, args) => {
            if (args.userId) {
                return Order.find({ userId: args.userId })
            } else {
                return Order.find().sort({ dateAdded: 1 })
            }
        }
        // checkout: async (parent, args, context) => {
        // }
    },

    Mutation: {
        createCampaign: async (parent, { title, goalAmount, goalDate, description, image }) => {
            return await Campaign.create({ title, goalAmount, goalDate, description, image })
        },
        updateCampaign: async (parent, args) => {
            return await Campaign.findOneAndUpdate(
                { _id: args.campaignId },
                { $set: args.input },
                { new: true }
            )
        },
        createProduct: async (parent, { name, price, description, image, category, sizes }) => {
            return await Product.create({ name, price, description, image, category, sizes })
        },
        removeProduct: async (parent, { productId }) => {
            return await Product.findOneAndDelete({ _id: productId })
        },
        createUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password, cart: null });
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('No user found with this email address');
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }

            const token = signToken(user);

            return { token, user };
        },
        createNews: async (parent, { title, body }) => {
            return await News.create({ title, body })
        },
        removeNews: async (parent, { newsId }) => {
            return await News.findOneAndDelete({ _id: newsId })
        },
        addToCart: async (parent, { productId, size, quantity }, context) => {
            const user = await User.findOne({ _id: context.user._id })
            const item = Product.findOne({ _id: productId })
            return await user.cart.update(
                {
                    $addToSet: {
                        items: {
                            productId: productId,
                            name: item.name,
                            size: size,
                            quantity: quantity,
                            price: item.price
                        },
                        total: (user.cart.total + item.price)
                    }
                }
            )
        },
        removeFromCart: async (parent, { productId }, context) => {
            const user = await User.findOne({ _id: context.user._id})
            const item = Product.findOne({ _id: productId })
            return await user.update(
                { $pull: {
                    cart: {
                        items: { productId: productId }
                    }
                }},
                { $set: { 
                    cart: { 
                        total: (user.cart.total - item.price) 
                    }
                }}
            )
        },
        clearCart: async (parent, args, context) => {
            return await User.findOneAndUpdate(
                { _id: context.user._id},
                { $set: 
                    { cart: null }
                }
            )   
        }
    }
}

module.exports = resolvers