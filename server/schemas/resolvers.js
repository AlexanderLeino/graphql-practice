const { Tech, Matchup } = require('../models')

//We need to create queries that use the the entry points that we established in our typeDefs

const resolvers = {
    Query: {
        //Tech doesnt have any arguments being passed to it.
        tech: async () => {
            return await Tech.find({})
        },
        //With matchups we are passing through an options parameter which is _id otherwise we just want to return all matchups
        matchups: async (parent, { _id }) => {
            
            const findQuery = _id ? { _id } : {}
            
            return await Matchup.find(findQuery);
        }
    },

    Mutation: {
        createMatchup: async (parent, args) => {
            return await Matchup.create(args)    
        },
        createVote: async (parent, {_id, techNum}) => {
            const updatedMatchup = await Matchup.findOneAndUpdate(
                { _id },
                { $inc: { [`tech${techNum}_votes`]: 1 } },
                { new: true }
              );
              return updatedMatchup
        }
    }

}

module.exports = resolvers