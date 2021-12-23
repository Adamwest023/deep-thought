import React from 'react';
//import key pieces to to the application
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
//BrowserRouter, Route, and Switch components from the react-router-dom then 
//renamed BrowserRouter to Router
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

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
      {/* wrap the div element in a Router component to make all the child components  */}
      {/* on the page aware of the client-side routing that is happening */}
      <Router>
    <div className='flex-column justify-flex-start min-100-vh'>
      <Header />
      <div className='container'>
        <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/signup" component={Signup}/>
        <Route exact path="/profile" component={Profile}/>
        <Route exact path="/thought" component={SingleThought}/>
        <Route component={NoMatch}/>
        </Switch>
      </div>
      <Footer />
    </div>
    </Router>
    </ApolloProvider>
  );
}

export default App;
