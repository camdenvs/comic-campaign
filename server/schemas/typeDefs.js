const { gql } = require('apollo-server-express')


const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        password: String
    }

    type Campaign {
        _id: ID,
        title: String,
        goalAmount: Number
        goalDate: String
        earned: Number
        investorCount: Number
        description: String
        isActive: Boolean
    }

    type News {
        _id: ID
        title: String
        body: String
    }

    type Product {
        _id: ID
        price: Number
        description: String
    }

    type Query {
        users: [User]
        user(username: String!): User
        campaigns: [Campaign]
        campaign(campaignId: ID!): Campaign
        products: [Product]
        product(productId: ID!): Product
        allNews: [News]
        news(newsId: ID!): News
    }
`