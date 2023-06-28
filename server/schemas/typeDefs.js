const { gql } = require('apollo-server-express')


const typeDefs = gql`
    type Auth {
        token: ID!
        user: User
    }
    
    type User {
        _id: ID
        username: String
        email: String
        password: String
        isAdmin: Boolean
    }

    type Campaign {
        _id: ID
        title: String
        goalAmount: Int
        goalDate: String
        earned: Int
        investorCount: Int
        description: String
        isActive: Boolean
        createdAt: String
        image: String
        updates: [Update]
        comments: [Comment]
        story: String
    }

    type Update {
        _id: ID
        authorId: ID
        title: String
        body: String
        createdAt: String
    }

    type Comment {
        _id: ID
        authorId: ID
        text: String
        createdAt: String
        upvotes: Int
        downvotes: Int
        replies: [Reply]
    }

    type Reply {
        _id: ID
        authorId: ID
        createdAt: String
        upvotes: Int
        downvotes: Int
    }

    type News {
        _id: ID
        title: String
        body: String
        createdAt: String
    }

    type Product {
        _id: ID
        name: String
        price: Int
        description: String
        image: String
        category: String
        sizes: String
        stripeProductId: String
    }

    type Item {
        _id: ID
        productId: ID
        name: String
        size: String
        quantity: Int
        price: Int
    }

    type Cart {
        _id: ID
        userId: ID
        items: [Item]
        total: Int
    }

    type Order {
        _id: ID
        userId: ID
        shippingAddress: String
        items: [Item]
        total: Int
        date_added: String
    }

    type Checkout {
        session: String
    }

    type Query {
        users: [User]
        me: User
        user(username: String!): User
        campaigns: [Campaign]
        campaign(campaignId: ID!): Campaign
        products(category: String): [Product]
        product(productId: ID!): Product
        allNews: [News]
        news(newsId: ID!): News
        orders(userId: ID): Order
        cart(userId: ID!): Cart
        checkout(cartId: ID!): Checkout
    }
    
    type Mutation {
        createCampaign(title: String!, goalAmount: Int!, goalDate: String!, description: String!, image: String!): Campaign
        updateCampaign(campaignId: ID!, title: String!, goalAmount: Int!, goalDate: String!, escription: String!, image: String!): Campaign
        createProduct(name: String! price: Int!, description: String!, image: String!, category: String!, sizes: String): Product
        removeProduct(productId: ID!): Product
        createUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        createNews(title: String!, body: String!): News
        removeNews(newsId: ID!): News
        addToCart(userId: ID!, productId: ID!, size: String!, quantity: Int!): Cart
        removeFromCart(userId: ID!, itemId: ID!): Cart
        clearCart(userId: ID!): Cart
    }
`

module.exports = typeDefs;