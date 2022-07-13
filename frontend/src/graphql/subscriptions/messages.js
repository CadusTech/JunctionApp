import { gql, useSubscription } from '@apollo/client'

export const MY_MESSAGES_SUBSCRIPTION = gql`
    subscription MyMessages {
        newMessages {
            id
            content
        }
    }
`
