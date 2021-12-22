    // import the gpl tagged template function
    const {gql} = require('apollo-server-express');

    //create our typeDefs
    //create a custom data type called Thought 
    // set a custom type that defines what we want to have returned in type Query
    const typeDefs = gql `
        type Thought {
            _id: ID
            thoughtText: String
            createdAt: String
            username: String
            reactionCount: Int
            reactions: [Reaction]
        }
        type Reaction {
            _id: ID
            reactionBody: String
            createdAt: String 
            username: String 
        }

        type User {
            _id: ID
            username: String
            email: String 
            friendCount: Int
            thoughts: [Thought]
            friends: [User]
        }
        type Query {
            me: User
            users: [User]
            user(username:String!): User
            thoughts(username: String): [Thought]
            thought(_id:ID!): Thought
        }
        type Mutation {
            login(email: String!, password:String!): Auth
            addUser(username:String!, email:String!, password:String!): Auth
            addThought(thoughtTest: String!):Thought
            addReaction(thoughtId: ID!, reactionBody: String!): Thought
            addFriend(friendId: ID!): User
        }
        type Auth {
            token: ID!
            user: User
        }
    `;

    //export the typeDefs
    module.exports = typeDefs;