import React from 'react';

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
                            {thought.username}
                            thought on {thought.createdAt}
                        </p>
                        <div className="card-body">
                            <p>{thought.thoughtText}</p>
                            <p className="mb-0">
                                Reactions: {thought.reactionCount} || Click to{' '}
                                {thought.reactionCount ? 'see' : 'start'} the discussion!
                            </p>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default ThoughtList;