const { GraphQLBoolean } = require('graphql')
const {
    GraphQLString,
    GraphQLObjectType,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInputObjectType,
} = require('graphql')
const { GraphQLDate } = require('graphql-iso-date')

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
            type: GraphQLDate,
        },
        sentAt: {
            type: GraphQLDate,
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
            args: {
                message: { type: GraphQLNonNull(MessageInput) },
            },
        },
        readMessage: {
            type: MessageType,
            args: {
                id: {
                    type: GraphQLNonNull(GraphQLID),
                },
            },
        },
        readMany: {
            type: GraphQLList(MessageType),
            args: {
                ids: { type: GraphQLNonNull(GraphQLList(GraphQLID)) },
            },
        },
    },
})

const SubscriptionType = new GraphQLObjectType({
    name: 'Subscription',
    fields: {
        newMessages: {
            type: MessageType,
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
            const userId = context.req.user ? context.req.user.sub : null
            if (!userId) return null

            return context.controller('Message').send(args.message, userId)
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
    Subscription: {
        newMessages: {
            subscribe: (parent, args, context) => {
                return context.controller('Message').subscribe()
            },
        },
    },
}

module.exports = {
    QueryType,
    MutationType,
    SubscriptionType,
    Resolvers,
    Types: {
        MessageType,
    },
}
