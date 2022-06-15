const { GraphQLBoolean } = require('graphql')
const {
    GraphQLString,
    GraphQLObjectType,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInputObjectType,
} = require('graphql')
const { GraphQLDateTime } = require('graphql-iso-date')

const MessageInput = new GraphQLInputObjectType({
    name: 'MessageInput',
    fields: {
        recipients: {
            type: GraphQLNonNull(GraphQLList(GraphQLString)),
        },
        content: {
            type: GraphQLNonNull(GraphQLString),
        },
    },
})

const MessageType = new GraphQLObjectType({
    name: 'Message',
    fields: {
        id: {
            type: GraphQLID,
        },
        recipients: {
            type: GraphQLList(GraphQLString),
        },
        content: {
            type: GraphQLString,
        },
        sender: {
            type: GraphQLString,
        },
        readAt: {
            type: GraphQLDateTime,
        },
        sentAt: {
            type: GraphQLDateTime,
        },
    },
})

const QueryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        messages: {
            type: GraphQLList(MessageType),
            args: {
                recipients: {
                    type: GraphQLList(GraphQLString),
                },
                read: {
                    type: GraphQLBoolean,
                },
            },
        },
    },
})

const MutationType = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        sendMessage: {
            type: MessageType,
            args: { message: GraphQLNonNull(MessageInput) },
        },
        readMessage: {
            type: MessageType,
            args: {
                id: GraphQLNonNull(GraphQLID),
            },
        },
        readMany: {
            type: GraphQLList(MessageType),
            args: {
                ids: GraphQLNonNull(GraphQLList(GraphQLID)),
            },
        },
    },
})

const Resolvers = {
    Query: {
        messages: async (parent, args, context) => {
            const userId = context.req.user ? context.req.user.sub : null
            if (!userId) return null

            return context.controller('Message').find(args, userId)
        },
    },
    Mutation: {
        sendMessage: async (parent, args, context) => {
            return context.controller('Message').send(args.message)
        },
        readMessage: async (parent, args, context) => {
            const userId = context.req.user ? context.req.user.sub : null
            if (!userId) return null

            return context.controller('Message').read(args.id, userId)
        },
        readMany: async (parent, args, context) => {
            const userId = context.req.user ? context.req.user.sub : null
            if (!userId) return null

            return context.controller('Message').readMany(args.ids, userId)
        },
    },
}

module.exports = {
    QueryType,
    MutationType,
    Resolvers,
    Types: {
        MessageType,
    },
}
