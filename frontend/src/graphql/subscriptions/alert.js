import { gql } from '@apollo/client'

export const NEW_ALERTS_SUBSCRIPTION = gql`
    subscription newAlert {
        newAlert {
            eventId
            content
            sender
            sentAt
        }
    }
`
