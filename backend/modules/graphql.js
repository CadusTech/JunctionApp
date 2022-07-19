const { ApolloServer } = require('apollo-server-express')
const { ApolloServerPluginDrainHttpServer } = require('apollo-server-core')
const { mergeSchemas, makeExecutableSchema } = require('graphql-tools')
const { GraphQLSchema, printSchema } = require('graphql')
const { Server: WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/lib/use/ws')
const { createServer } = require('http')
// const { SharedSchema } = require('@hackjunction/shared/schemas')
/** Schemas */
const Registration = require('./registration/graphql')
const Event = require('./event/graphql')
const UserProfile = require('./user-profile/graphql')
const Organization = require('./organization/graphql')
const Message = require('./message/graphql')

const buildGetController = require('./graphql-controller-factory')

module.exports = app => {
    const modules = [UserProfile, Registration, Event, Organization, Message]
    const executableSchemas = modules.map(
        ({ QueryType, MutationType, SubscriptionType, Resolvers }) => {
            const rawSchema = new GraphQLSchema({
                query: QueryType,
                mutation: MutationType,
                subscription: SubscriptionType,
            })
            return makeExecutableSchema({
                typeDefs: printSchema(rawSchema),
                resolvers: Resolvers,
            })
        },
    )
    const schema = mergeSchemas({
        schemas: executableSchemas,
    })

    const httpServer = createServer(app)

    const wsServer = new WebSocketServer({
        // This is the `httpServer` we created in a previous step.
        server: httpServer,
        // Pass a different path here if your ApolloServer serves at
        // a different path.
        path: '/graphql',
    })
    const serverCleanup = useServer(
        {
            schema,
            context: ctx => {
                // You can define your own function for setting a dynamic context
                // or provide a static value
                console.info(ctx)
            },
        },
        wsServer,
    )

    const server = new ApolloServer({
        schema,
        playground: true,
        introspection: true,
        context: ({ req, res }) => ({
            req,
            res,
            userId: req.user ? req.user.sub : null,
            controller: buildGetController(),
        }),
        plugins: [
            // Proper shutdown for the HTTP server.
            ApolloServerPluginDrainHttpServer({ httpServer }),

            // Proper shutdown for the WebSocket server.
            {
                async serverWillStart() {
                    return {
                        async drainServer() {
                            await serverCleanup.dispose()
                        },
                    }
                },
            },
        ],
    })

    server.applyMiddleware({ app })
    return httpServer
}
