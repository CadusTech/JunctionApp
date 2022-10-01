import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { BOOK_MEETING, CREATE_MEETING_SLOT } from 'graphql/mutations/meetings'
import * as SnackbarActions from 'redux/snackbar/actions'
import { getMeetingslots } from 'graphql/queries/meetings'

import Button from 'components/generic/Button'
import MuiButton from '@material-ui/core/Button'
import { Link, makeStyles, Tooltip, withStyles } from '@material-ui/core'
import { useDispatch } from 'react-redux'
import theme from 'material-ui-theme'
import { CallMissedSharp } from '@material-ui/icons'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'

const useStyles = makeStyles(theme => ({
    backgroundJee: {
        position: 'absolute',
        backgroundColor: 'grey',
        width: '100%',
        height: '100vh',
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
        position: 'absolute',
        right: '0',
        width: '25px',
        height: '25px',
        fontSize: 'xx-large',
    },
}))

export default ({
    // startTime,
    // endTime,
    // booked,
    // googleMeetLink,
    // bookAction,
    // cancelAction,
    // hasFutureBooking,
    bookAction,
    close,
}) => {
    const [alignment, setAlignment] = React.useState('online')

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment)
    }

    const classes = useStyles()
    return (
        <div className={classes.backgroundJee}>
            <div className={classes.popupWindow} style={{ zIndex: 10 }}>
                <Button onClick={close} className={classes.closeIcon}>
                    X
                </Button>
                <ToggleButtonGroup
                    size="large"
                    value={alignment}
                    exclusive
                    onChange={handleChange}
                >
                    <ToggleButton value="online">Online</ToggleButton>
                    <ToggleButton value="physical">Physical</ToggleButton>
                </ToggleButtonGroup>
            </div>
        </div>
    )
}
