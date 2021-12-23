const { gql } = require('apollo-server')

const typeDefs = gql`

type Tech {
    _id: ID!
    name: String!
}

type Matchup {
    _id: ID!
    tech1: String!
    tech2: String!
    tech1_votes: Int
    tech2_votes: Int
}

type Query {
    tech: [Tech]
    matchups(_id: String): [Matchup]
}
`

module.exports = typeDefs