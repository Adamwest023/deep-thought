import React from 'react';
//import the ThoughtList
import ThoughtList from '../components/ThoughtList';

//import userQuery hook
import { useQuery } from '@apollo/client';
//import newly created query
import { QUERY_THOUGHTS } from '../utils/queries';


const Home = () => {
  // use useQuery hook to make query request
  //when we load the component, we'll execute the query
  //@apollo/client library provides a loading property to indicate that the request isn't done just yet
  // information is stored in the destructured data property
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  //get thought data out of the query's response
  //using optional chaining to say "if data exists, store it in the thoughts constant we just created"
  //if data is undefined  then save an empty array to the thoughts component 
  const thoughts = data?.thoughts || [];
  return (
    <main>
      <div className="flex-row justify-space-between">
        <div className="col-12 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList
              thoughts={thoughts}
              title="Some Feed for Thought(s)..."
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default Home
