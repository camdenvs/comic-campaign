import React from 'react'
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home'
import Campaign from './pages/Campaign'
import News from './pages/News'
import About from './pages/About'
import Store from './pages/Store'
import OneCampaign from './pages/OneCampaign'
import Product from './pages/Product'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Header from './components/Header'
import Footer from './components/Footer'
import OneNews from './pages/OneNews';
import { Flex } from '@chakra-ui/react';
import Success from './pages/Success';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: 'https://cyberfrogshop-ae84083b07a0.herokuapp.com/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Header />
        <Flex flexDirection='column' flexGrow='1' minHeight='85vh' justifyContent={'space-between'}>
          <Routes>
            <Route
              path='/'
              element={<Home />}
            />
            <Route
              path="/login"
              element={<Login />}
            />
            <Route
              path="/signup"
              element={<Signup />}
            />
            <Route
              path='/about'
              element={<About />}
            />
            <Route
              path='/campaigns'
              element={<Campaign />}
            />
            <Route
              path='/campaigns/:campaignId'
              element={<OneCampaign />}
            />
            <Route
              path='/store'
              element={<Store />}
            />
            <Route
              path='/store/:category'
              element={<Store />}
            />
            <Route
              path='/product/:productId'
              element={<Product />}
            />
            <Route
              path='/news'
              element={<News />}
            />
            <Route
              path='/news/:newsId'
              element={<OneNews />}
            />
            <Route
              path='/success'
              element={<Success />}
            />
            <Route path='*' element={<Navigate to='/'/>} />
          </Routes>
          <Footer />
        </Flex>
      </Router>
    </ApolloProvider>
  );
}

export default App;
