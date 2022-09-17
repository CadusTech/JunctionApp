import { gql } from '@apollo/client'

export const ALERTS_QUERY = gql`
    query alerts($eventIds: [String!]!) {
        alerts(eventIds: $eventIds) {
            recipients
            content
            sender
            sentAt
            readAt
        }
    }
`
