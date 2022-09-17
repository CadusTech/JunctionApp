import React from 'react'

export function Alerts({ alerts = [{ content: 'hello world' }] }) {
    return (
        <div>
            {alerts.map(a => (
                <div>{a.content}</div>
            ))}
        </div>
    )
}
