import React from 'react';
//import Link component 
import {Link} from 'react-router-dom';

//instruct the component will receive two props: title and a thoughts array
const ThoughtList = ({ thoughts, title }) => {
    // conditionally render JSX by checking if there's any data in the array first
    if (!thoughts.length) {
        return <h3>No Thoughts Yet</h3>;
    }
    //if there is data we return the thoughts using the math method 
    return (
        <div>
            <h3>{title}</h3>
            {thoughts &&
                thoughts.map(thought => (
                    <div key={thought._id} className="card mb-3">
                        <p className="card-header">
                            <Link
                            to={`/profile/${thought.username}`}
                            style={{ fontWeight: 700}}
                            className="text-light"
                            >
                                {thought.username}
                            </Link>{' '}
                            thought on {thought.createdAt}
                        </p>
                        <div className="card-body">
                            <Link to={`/thought/${thought._id}`}>
                            <p>{thought.thoughtText}</p>
                            <p className="mb-0">
                                Reactions: {thought.reactionCount} || Click to{' '}
                                {thought.reactionCount ? 'see' : 'start'} the discussion!
                            </p>
                            </Link>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default ThoughtList;