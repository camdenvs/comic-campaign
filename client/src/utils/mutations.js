import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const CREATE_CAMPAIGN = gql`
  mutation createCampaign($input: CampaignInput!) {
    createCampaign(input: $input) {
      _id
      title
      goalAmount
      goalDate
      earned
      investorCount
      description
      isActive
      image
    }
  }
`

export const UPDATE_CAMPAIGN = gql`
  mutation updateCampaign($campaignId: ID!, $input: CampaignInput!) {
    updateCampaign(campaignId: $campaignId, input: $input) {
      _id
      title
      goalAmount
      goalDate
      earned
      investorCount
      description
      isActive
      image
    }
  }
`

export const CREATE_PRODUCT = gql`
  mutation createProduct($name: String!, $price: Int!, $description: String!, $image: String!, $category: String!) {
    createProduct(name: $name, price: $price, description: $description, image: $image, category: $category) {
      _id
      name
      price
      description
      image
      category
    }
  }
`

export const REMOVE_PRODUCT = gql`
  mutation removeProduct($productId: ID!) {
    removeProduct(productId: $productId) {
      _id
      name
      price
      description
      image
      category
    }
  }
`

export const CREATE_NEWS = gql`
  mutation createNews($title: String, $body: String!) {
    createNews(title: $title, body: $body) {
      _id
      title
      body
    }
  }
`

export const REMOVE_NEWS = gql`
  mutation removeNews($newsId: ID!) {
    removeNews(newsId: $newsId) {
      _id
      title
      body
    }
  }
`