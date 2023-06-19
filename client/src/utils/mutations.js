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
  mutation createCampaign($title: String!, $goalAmount: Int!, $goalDate: String!, $description: String!, $image: String!) {
    createCampaign(title: $title, goalAmount: $goalAmount, goalDate: $goalDate, description: $description, image: $image) {
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
  mutation createProduct($name: String!, $price: Int!, $description: String!, $image: String!, $category: String!, $sizes: String) {
    createProduct(name: $name, price: $price, description: $description, image: $image, category: $category, sizes: $sizes) {
      _id
      name
      price
      description
      image
      category
      sizes
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

export const UPLOAD_FILE = gql`
  mutation singleUpload($file: Upload!) {
    singleUpload(file: $file) {
      filename
      mimetype
      encoding
    }
  }
`

export const ADD_TO_CART = gql`
  mutation addToCart($productId: ID!, $size: String, $quantity: Int!) {
    addToCart(productId: $productId, size: $size, quantity: $quantity) {
      _id
      cart
    }
  }
`

export const REMOVE_FROM_CART = gql`
  mutation removeFromCart($productId: ID!) {
    removeFromCart(productId: $productId) {
      _id
      cart
    }
  }
`

export const CLEAR_CART = gql`
  mutation clearCart {
    clearCart {
      _id
      cart
    }
  }
`