import React from 'react';
//import the ThoughtList
import ThoughtList from '../components/ThoughtList';

//import userQuery hook
import { useQuery } from '@apollo/client';
//import newly created query
import { QUERY_THOUGHTS, QUERY_ME_BASIC } from '../utils/queries';

import Auth from '../utils/auth';

import FriendList from '../components/FriendList';


const Home = () => {
  // use useQuery hook to make query request
  //when we load the component, we'll execute the query
  //@apollo/client library provides a loading property to indicate that the request isn't done just yet
  // information is stored in the destructured data property
  const { loading, data } = useQuery(QUERY_THOUGHTS);

  //use object deconstructing to extract `data` from the `useQuery` hook
  const { data: userData } = useQuery(QUERY_ME_BASIC);
  //get thought data out of the query's response
  //using optional chaining to say "if data exists, store it in the thoughts constant we just created"
  //if data is undefined  then save an empty array to the thoughts component 
  const thoughts = data?.thoughts || [];

  const loggedIn = Auth.loggedIn();

  return (
    <main>
      <div className="flex-row justify-space-between">
        <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ThoughtList thoughts={thoughts} title="Some Feed for Thought(s)..." />
          )}
        </div>
        {loggedIn && userData ? (
          <div className="col-12 col-lg-3 mb-3">
            <FriendList
              username={userData.me.username}
              friendCount={userData.me.friendCount}
              friends={userData.me.friends}
            />
          </div>
        ) : null}
      </div>
    </main>
  );
};

export default Home
