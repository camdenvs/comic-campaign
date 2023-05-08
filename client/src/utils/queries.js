import { gql } from '@apollo/client';

export const QUERY_CAMPAIGNS = gql`
  query getCampaigns {
    campaigns {
      _id
      title
      goalAmount
      goalDate
      earned
      investorCount
      description
      isActive
      createdAt
    }
  }
`;

export const QUERY_SINGLE_CAMPAIGN = gql`
  query getSingleCampaign($campaignId: ID!) {
    campaign(campaignId: $campaignId) {
      _id
      title
      goalAmount
      goalDate
      earned
      investorCount
      description
      isActive
    }
  }
`;

export const QUERY_PRODUCTS = gql`
  query getProducts {
    products {
      _id
      name
      price
      description
    }
  }
`;

export const QUERY_SINGLE_PRODUCT = gql`
  query getSingleProduct($productId: ID!) {
    product(productId: $productId) {
      _id
      name
      price
      description
    }
  }
`;

export const QUERY_NEWS = gql`
  query getNews {
    allNews {
      _id
      title
      body
      createdAt
    }
  }
`;

export const QUERY_SINGLE_NEWS = gql`
  query getNews($newsId: ID!) {
    news(newsId: $newsId) {
      _id
      title
      body
      createdAt
    }
  }
`;
