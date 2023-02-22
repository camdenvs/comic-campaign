const { gql } = require('apollo-server-express')


const typeDefs = gql`
    input CampaignInput {
        title: String!
        goalAmount: Number!
        goalDate: String!
        earned: Number!
        investorCount: Number!
        description: String!
        isActive: Boolean!
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

    type Mutation {
        createCampaign(input: CampaignInput): Campaign
        updateCampaign(campaignId: ID!, input: CampaignInput): Campaign
        createProduct(price: Number!, description: String!): Product
        removeProduct(productId: ID!): Product
        createUser(username: String!, email: String!, password: String!): Auth
        updateUser(userId: ID!, username: String!, email: String!, password: String!, isAdmin: Boolean): User
        login(email: String!, password: String!): Auth
        createNews(title: String!, body: String!): News
        removeNews(newsId: ID!): News
    }
`

module.exports = typeDefs;