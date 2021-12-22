import React from 'react';
//import key pieces to to the application
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';

//establish a new link to the GraphQL server at the endpoint /graphql
const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});
//use the ApolloClient() constructor to instantiate the Apollo Client instance
//and create the connection to the API endpoint
const client = new ApolloClient({
  link: httpLink,
  //also instantiate a new cache object using new InMemoryCache()
  cache: new InMemoryCache(),
});

function App() {
  return (
    //enable our entire application to interact with our Apollo Client instance
    //because we are passing the client var in as the value for the client prop, everything in the JSX tag will 
    //eventually have access to the server's API data through the client we set up 
    <ApolloProvider client= {client}>
    <div className='flex-column justify-flex-start min-100-vh'>
      <Header />
      <div className='container'>
        <Home />
      </div>
      <Footer />
    </div>
    </ApolloProvider>
  );
}

export default App;
