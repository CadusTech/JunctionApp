import React from 'react'
import { groupBy } from 'lodash-es'
import { useQuery, useSubscription, useMutation } from '@apollo/client'
import PageWrapper from 'components/layouts/PageWrapper'
import { MY_MESSAGES_QUERY } from 'graphql/queries/messages'
import { MY_MESSAGES_SUBSCRIPTION } from 'graphql/subscriptions/messages'

/**
 * Functioncomponent that renders a chat
 * window for a given recipient id list
 */
export function Chat({ recipients }) {
    const { data, loading, error } = useQuery(MY_MESSAGES_QUERY, {
        variables: { recipients },
    })
    const { data: newMessage, loading: subscriptionLoading } = useSubscription(
        MY_MESSAGES_SUBSCRIPTION,
    )

    return (
        <PageWrapper loading={loading}>
            <div>
                {data &&
                    [...data.messages]
                        .sort(
                            (a, b) => +new Date(a.sentAt) - +new Date(b.sentAt),
                        )
                        .map(m => {
                            return (
                                <div key={m.id}>
                                    {m.sender}, {m.content}, {m.sentAt}
                                </div>
                            )
                        })}
                {newMessage && JSON.stringify(newMessage)}
            </div>
            <div>{error && JSON.stringify(error)}</div>
        </PageWrapper>
    )
}
