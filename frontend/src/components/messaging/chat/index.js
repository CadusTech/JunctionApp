import React, { useState, useEffect } from 'react'
import { groupBy } from 'lodash-es'
import { useQuery, useSubscription, useMutation } from '@apollo/client'
import PageWrapper from 'components/layouts/PageWrapper'
import { MY_MESSAGES_QUERY } from 'graphql/queries/messages'
import { MY_MESSAGES_SUBSCRIPTION } from 'graphql/subscriptions/messages'
import { faOldRepublic } from '@fortawesome/free-brands-svg-icons'

/**
 * Functioncomponent that renders a chat
 * window for a given recipient id list
 */
export function Chat({ recipients }) {
    const [messages, setMessages] = useState([])
    const { data, loading, error } = useQuery(MY_MESSAGES_QUERY, {
        variables: { recipients },
    })
    const { data: newMessage, loading: subscriptionLoading } = useSubscription(
        MY_MESSAGES_SUBSCRIPTION,
    )

    useEffect(() => {
        let allMessages = []
        if (data) {
            setMessages(old => {
                const newArray = [...old, ...data.messages]
                newArray.sort(
                    (a, b) => +new Date(a.sentAt) - +new Date(b.sentAt),
                )
                return old.length === 0 ? newArray : old
            })
        }
        if (newMessage) {
            setMessages(old => {
                const newArray = [...old, newMessage.newMessage]
                newArray.sort(
                    (a, b) => +new Date(a.sentAt) - +new Date(b.sentAt),
                )
                return newArray
            })
        }
    }, [data, setMessages, newMessage])

    return (
        <PageWrapper loading={loading}>
            <div>
                {messages.length > 0 &&
                    messages
                        /*  */
                        .map(m => {
                            return (
                                <div key={m.id}>
                                    {m.sender}, {m.content}, {m.sentAt}
                                </div>
                            )
                        })}
                <button onClick={() => console.info(messages)}>wahoo</button>
            </div>
            <div>{error && JSON.stringify(error)}</div>
        </PageWrapper>
    )
}
