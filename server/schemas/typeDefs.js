const { gql } = require('apollo-server-express')


const typeDefs = gql`
    input CampaignInput {
        title: String!
        goalAmount: Int!
        goalDate: String!
        earned: Int!
        investorCount: Int!
        description: String!
        isActive: Boolean!
        image: String!
    }

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
    }

    type Query {
        users: [User]
        me: User
        user(username: String!): User
        campaigns: [Campaign]
        campaign(campaignId: ID!): Campaign
        products: [Product]
        product(productId: ID!): Product
        allNews: [News]
        news(newsId: ID!): News
    }

    type Mutation {
        createCampaign(input: CampaignInput): Campaign
        updateCampaign(campaignId: ID!, input: CampaignInput): Campaign
        createProduct(name: String! price: Int!, description: String!, image: String!, category: String!): Product
        removeProduct(productId: ID!): Product
        createUser(username: String!, email: String!, password: String!): Auth
        login(email: String!, password: String!): Auth
        createNews(title: String!, body: String!): News
        removeNews(newsId: ID!): News
    }
`

module.exports = typeDefs;