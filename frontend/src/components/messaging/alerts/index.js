export function Alerts({ alerts = [] }) {
    return (
        <>
            {alerts.map(a => (
                <div>{a.content}</div>
            ))}
        </>
    )
}
