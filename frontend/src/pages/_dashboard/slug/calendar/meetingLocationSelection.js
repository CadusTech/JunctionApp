import React, { useState } from 'react'

import Button from 'components/generic/Button'

import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    makeStyles,
} from '@material-ui/core'
import { getMeetingRooms } from 'graphql/queries/meetings'

const useStyles = makeStyles(theme => ({
    background: {
        position: 'absolute',
        backgroundColor: '#00000080',
        width: '100%',
        height: '100%',
        top: '0',
        left: '0',
    },
    popupWindow: {
        position: 'relative',
        width: '70%',
        margin: '0 auto',
        height: 'fit-content',
        maxHeight: '70vh',
        marginTop: 'calc(100vh - 85vh - 20px)',
        backgroundColor: '#fff',
        borderRadius: '4px',
        padding: '20px',
        border: '1px solid #999',
        overflow: 'auto',
    },
    closeIcon: {
        width: '25px',
        height: '25px',
        fontSize: 'xx-large',
        color: 'black',
    },
    selected: {
        background: theme.palette.primary.main,
    },
    notSelected: {
        border: theme.palette.grey[300],
        background: theme.palette.grey[300],
    },
}))

export default ({ bookAction, meetingInfo, attendeesCount, eventId, close }) => {
    const [onlineSelected, setOnlineSelected] = useState(true)
    const [roomSelected, setRoomSelected] = useState(null)
    const start = new Date(meetingInfo.startTime)
    const end = new Date(meetingInfo.endTime)
    const startMinutes = start.getMinutes()
    const endMinutes = end.getMinutes()
    const [meetingRooms, loading, error] = getMeetingRooms({
        eventId: eventId,
    })



    const handleLocationChange = selection => {
        setOnlineSelected(selection)
    }

    const rooms = [
        'Y229',
        'Y338',
        'K220',
        'A330',
        'L221',
        'L440',
        'H110',
        'J220',
        'K123',
        'R200',
    ]

    const handleRoomChange = event => {
        setRoomSelected(event.target.value)
    }

    const classes = useStyles()
    return (
        <div className={classes.background}>
            <div
                className={classes.popupWindow}
                style={{
                    zIndex: 10,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button onClick={close} className={classes.closeIcon}>
                        X
                    </Button>
                </div>
                <h2 style={{ textAlign: 'center' }}>
                    <div>Selected meeting:</div>
                    <span>
                        {start.getDate()}.{start.getMonth() + 1}.
                    </span>
                    &nbsp;
                    <span>
                        {`${start.getHours()}:${
                            startMinutes === 0 ? '00' : startMinutes
                        }`}
                    </span>
                    <span> - </span>
                    <span>{`${end.getHours()}:${
                        endMinutes === 0 ? '00' : endMinutes
                    }`}</span>
                </h2>
                <h3 style={{ textAlign: 'center' }}>
                    Choose whether you want an online meeting or a physical
                    meeting:
                </h3>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginBottom: '1rem',
                        }}
                    >
                        <Button
                            variant="contained"
                            className={
                                onlineSelected
                                    ? classes.selected
                                    : classes.notSelected
                            }
                            style={{
                                marginRight: '0.5rem',
                                padding: '0.75rem 2rem',
                            }}
                            onClick={() => handleLocationChange(true)}
                        >
                            Online
                        </Button>

                        <Button
                            variant="contained"
                            className={
                                onlineSelected
                                    ? classes.notSelected
                                    : classes.selected
                            }
                            style={{ padding: '0.75rem 2rem' }}
                            onClick={() => handleLocationChange(false)}
                        >
                            Physical
                        </Button>
                    </div>
                    {!onlineSelected && (
                        <FormControl style={{ width: '70%' }}>
                            <InputLabel id="challenge-selection-label">
                                Rooms
                            </InputLabel>
                            {}
                            <Select
                                labelId="room-selection-label"
                                id="room-selection"
                                label="Choose a room"
                                onChange={handleRoomChange}
                            >
                                {rooms.map((room, index) => (
                                    <MenuItem value={room}>{room}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}
                </div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '10%',
                    }}
                >
                    {roomSelected && !onlineSelected && (
                        <p>
                            Confirm the booking to arrange a meeting in{' '}
                            {roomSelected}
                        </p>
                    )}
                    {onlineSelected && (
                        <p>
                            Confirm the booking to receive a Google Meet link
                            for the meeting.
                        </p>
                    )}
                </div>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: 'auto',
                    }}
                >
                    <Button variant="contained">Confirm</Button>
                </div>
            </div>
        </div>
    )
}
