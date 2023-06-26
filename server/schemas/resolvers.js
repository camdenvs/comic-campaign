const { AuthenticationError } = require('apollo-server-express');
const { User, Campaign, News, Product, Order, Cart } = require('../models');
const { signToken } = require('../utils/auth');
require('dotenv').config()
const stripe = require("stripe")(process.env.STRIPE_KEY)

const resolvers = {
    Query: {
        users: async () => {
            return await User.find()
        },
        user: async (parent, { username }) => {
            return await User.findOne({ username })
        },
        campaigns: async () => {
            return await Campaign.find().sort({ createdAt: -1 })
        },
        campaign: async (parent, { campaignId }) => {
            return await Campaign.findOne({ _id: campaignId })
        },
        products: async (parent, { category }) => {
            const params = category ? { category } : {}
            return await Product.find(params)
        },
        product: async (parent, { productId }) => {
            return await Product.findOne({ _id: productId })
        },
        allNews: async () => {
            return await News.find().sort({ createdAt: -1 })
        },
        news: async (parent, { newsId }) => {
            return await News.findOne({ _id: newsId })
        },
        me: async (parent, args, context) => {
            if (context.user) {
                return await User.findOne({ _id: context.user._id });
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        orders: async (parent, args) => {
            if (args.userId) {
                return await Order.find({ userId: args.userId })
            } else {
                return await Order.find().sort({ dateAdded: 1 })
            }
        },
        cart: async (parent, { userId }) => {
            return await Cart.findOne({ userId: userId })
        },
        checkout: async (parent, { cartId }, context) => {
            const cart = await Cart.findOne({ _id: cartId })
            const url = new URL(context.headers.referer).origin

            const line_items = []

            cart.items.forEach(async (item) => {
                const product = await Product.findOne({ _id: item.productId })
                const stripeProduct = await stripe.products.retrieve(product.stripeProductId)
                
                line_items.push({
                    price: stripeProduct.default_price,
                    quantity: item.quantity
                })
            })

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items,
                mode: 'payment',
                success_url: `${url}/success`,
                cancel_url: `${url}/`
            })

            return { session: session.id }
        }
    },

    Mutation: {
        createCampaign: async (parent, { title, goalAmount, goalDate, description, image }) => {
            return await Campaign.create({ title, goalAmount, goalDate, description, image: 'all-caps-placeholder.jpg' })
        },
        updateCampaign: async (parent, args) => {
            return await Campaign.findOneAndUpdate(
                { _id: args.campaignId },
                { $set: args.input },
                { new: true }
            )
        },
        createProduct: async (parent, { name, price, description, image, category, sizes }) => {
            const stripeProductId = await stripe.products.create({
                name: name,
                description: description,
                default_price_data: {
                    unit_amount: price * 100,
                    currency: 'usd',
                }
            })
            return await Product.create({ name, price, description, image: 'all-caps-placeholder.jpg', category, sizes, stripeProductId: stripeProductId.id })
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
        addToCart: async (parent, { userId, productId, size, quantity }) => {
            const cart = await Cart.findOne({ userId: userId })
            const item = await Product.findOne({ _id: productId })
            if (cart) {
                return await Cart.findOneAndUpdate(
                    { userId: userId },
                    {
                        $addToSet: {
                            items: {
                                productId: productId,
                                name: item.name,
                                size: size,
                                quantity: quantity,
                                price: item.price*quantity
                            }
                        },
                        $set: { total: cart.total + (quantity*item.price) }
                    },
                    {
                      new: true,
                      runValidators: true,
                    }
                )
            }
            else{
                return await Cart.create({
                    userId: userId,
                    items: [{ productId, name: item.name, quantity, price: item.price, size }],
                    total: quantity*item.price
                })
            }
        },
        removeFromCart: async (parent, { itemId, userId }) => {
            const cart = await Cart.findOne({ userId: userId })
            const itemIndex = cart.items.findIndex(p => p._id == itemId)
            return await cart.updateOne(
                {
                    $pull: {
                        items: { _id: itemId }
                    },
                    $set: {
                        total: (cart.total - Number(cart.items[itemIndex].price))
                    }
                },
                {
                  new: true,
                  runValidators: true,
                }
            )
        },
        clearCart: async (parent, { userId }) => {
            return await Cart.findOneAndDelete(
                { userId: userId }
            )
        }
    }
}

module.exports = resolvers