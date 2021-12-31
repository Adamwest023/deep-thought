import React from 'react';
//import a react hook
import { useParams } from 'react-router-dom'

import ReactionList from '../components/ReactionList';

import { useQuery } from '@apollo/client';
import { QUERY_THOUGHT } from '../utils/queries';

const SingleThought = (props) => {
  const { id: thoughtId } = useParams();
  //variables laoding and data are destructured from the useQuery hook
  //the loading var is used to briefly show a loading div
  //data var is used to populate a thought object
  const { loading, data } = useQuery(QUERY_THOUGHT, {
    variable: { id: thoughtId }
  });

  const thought = data?.thought || {};

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            {thought.username}
          </span>{' '}
          thought on {thought.createAt}
        </p>
        <div className="card-body">
          <p>{thought.thoughtText}</p>
        </div>
      </div>
      {thought.reactionCount > 0 && (
        <ReactionList reactions={thought.reactions}
        />)}
    </div>
  );
};

export default SingleThought;
