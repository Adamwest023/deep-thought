import React from 'react';
//import key pieces to to the application
//BrowserRouter, Route, and Switch components from the react-router-dom then 
//renamed BrowserRouter to Router
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';

//with setContext we can create a middleware function that will retrieve the token
import { setContext } from '@apollo/client/link/context';

//import components
import Header from './components/Header';
import Footer from './components/Footer';

//import pages 
import Home from './pages/Home';
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import SingleThought from './pages/SingleThought';
import Profile from './pages/Profile';
import Signup from './pages/Signup';

//establish a new link to the GraphQL server at the endpoint /graphql
const httpLink = createHttpLink({
  uri: '/graphql',
});

//we use the setContext() to retrieve the token from localStorage and set the HTTP request header
//of every request to include the token, whether the request needs it or not.
const authLink = setContext((_, {headers}) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  }
});

//use the ApolloClient() constructor to instantiate the Apollo Client instance
//and create the connection to the API endpoint
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  //also instantiate a new cache object using new InMemoryCache()
  cache: new InMemoryCache(),
});


function App() {
  return (
    //enable our entire application to interact with our Apollo Client instance
    //because we are passing the client var in as the value for the client prop, everything in the JSX tag will 
    //eventually have access to the server's API data through the client we set up 
    <ApolloProvider client={client}>
      {/* wrap the div element in a Router component to make all the child components  */}
      {/* on the page aware of the client-side routing that is happening */}
      <Router>
        <div className='flex-column justify-flex-start min-100-vh'>
          <Header />
          <div className='container'>
            {/* Switch allows you to set a catch-all route */}
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/profile/:username?" component={Profile} />
              <Route exact path="/thought/:id" component={SingleThought} />
              <Route component={NoMatch} />
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
