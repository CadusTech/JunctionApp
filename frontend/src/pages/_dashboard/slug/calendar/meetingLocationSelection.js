import React, { useState } from 'react'

import Button from 'components/generic/Button'

import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    makeStyles,
} from '@material-ui/core'

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
        height: '70vh',
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

export default ({ bookAction, meetingInfo, close }) => {
    const [onlineSelected, setOnlineSelected] = useState(true)
    const start = new Date(meetingInfo.startTime)
    const end = new Date(meetingInfo.endTime)
    const startMinutes = start.getMinutes()
    const endMinutes = end.getMinutes()

    const handleLocationChange = selection => {
        setOnlineSelected(selection)
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
                    {onlineSelected ? (
                        <p>
                            Confirm the booking to receive a Google Meet link
                            for the meeting.
                        </p>
                    ) : (
                        <FormControl style={{ width: '70%' }}>
                            <InputLabel id="challenge-selection-label">
                                Rooms
                            </InputLabel>
                            <Select
                                labelId="challenge-selection-label"
                                id="challenge-selection"
                                label="Choose a challenge"
                            >
                                <MenuItem value="1">Room 1</MenuItem>
                                <MenuItem value="2">Room 2</MenuItem>
                                <MenuItem value="3">Room 3</MenuItem>
                                <MenuItem value="4">Room 4</MenuItem>
                            </Select>
                        </FormControl>
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
