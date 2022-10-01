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
import { createTheme } from '@material-ui/core/styles'
import { CallMissedSharp } from '@material-ui/icons'
import BorderLessToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'

import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    backgroundJee: {
        position: 'absolute',
        backgroundColor: 'grey',
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
        color: 'black'
    },
    buttonStyle: {

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
            <div className={classes.popupWindow} style={{
                zIndex: 10,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',

            }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button onClick={close} className={classes.closeIcon}>
                        X
                    </Button>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                        <Button variant='contained' style={{ marginRight: "0.5rem", padding: '0.75rem 2rem' }} >
                            Online
                        </Button>

                        <Button variant='contained' style={{ padding: '0.75rem 2rem' }}>
                            Physical
                        </Button>
                    </div>
                    <FormControl style={{ width: '70%' }}>
                        <InputLabel id="challenge-selection-label">
                            Huoneet
                            </InputLabel>
                        <Select
                            labelId="challenge-selection-label"
                            id="challenge-selection"
                            label="Choose a challenge"
                        >
                            <MenuItem value="1">Huone 1</MenuItem>
                            <MenuItem value="2">Huone 1</MenuItem>
                            <MenuItem value="3">Huone 1</MenuItem>
                            <MenuItem value="4">Huone 1</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant='contained' >
                        Confirm
                    </Button>
                </div>
            </div>
        </div>
    )
}
