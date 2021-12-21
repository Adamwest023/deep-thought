// import the Mongoose models
const { User, Thought } = require('../models');
const resolvers = {
    Query: {
        //thoughts is queried and will perform a .find() on  the Thought model
        //pass the parent as more of a placeholder parameter so we can access the username
        thoughts: async (parent, { username }) => {
            // user the ternary operator to check if username exists
            // if it does we est params to an object with a username key
            const params = username ? { username } : {};
            return Thought.find(params).sort({ createdAt: -1 });
        },
        thought: async (parent, { _id }) => {
            return Thought.findOne({ _id });
        },
        // get all users
        users: async () => {
            return User.find()
                .select('-__v -password')
                .populate('friends')
                .populate('thoughts');
        },
        // get a user by username
        user: async (parent, { username }) => {
            return User.findOne({ username })
                .select('-__v -password')
                .populate('friends')
                .populate('thoughts');
        },
    }
};

module.exports = resolvers;