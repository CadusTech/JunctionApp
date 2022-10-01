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

const useStyles = makeStyles(theme => ({
    meetingCard: ({ booked }) => ({
        width: '100%',
        borderRadius: '0.5em',
        padding: '0.75em',
        marginBottom: '0.5em',
        background: booked ? theme.palette.primary.main : '#d1ebdf',
        fontSize: '16px',
        cursor: 'pointer',
        '&:hover': {
            filter: 'brightness(1.1)',
        },
    }),
    meetingTime: {
        display: 'flex',
        justifyContent: 'space-evenly',
        fontWeight: 'bold',
        fontSize: '1.25em',
        margin: '0.5em 0',
    },
    actionButton: ({ booked }) => ({
        color: 'black',
        fontWeight: 'bold',
        borderRadius: '0.5em',
        width: 'fit-content',
        marginTop: '0.75em',
        fontSize: '0.875em',
    }),
    meetingInfo: {
        fontWeight: 'bold',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    meetsLink: {
        textDecoration: 'none',
    },
    joinButton: {
        borderRadius: '0.5em',
        fontSize: '0.875em',
        color: 'black',
        width: 'fit-content',
        marginTop: '0.75em',
        marginRight: '0.75em',
        background: '#d1ebdf',
        borderColor: '#d1ebdf',
        '&:hover': {
            background: '#39967a',
            borderColor: '#39967a',
        },
    },
}))

const ButtonBase = withStyles({
    root: {
        '&.Mui-disabled': {
            pointerEvents: 'auto',
        },
    },
})(MuiButton)

const ButtonWithTooltip = ({ tooltipText, disabled, onClick, ...other }) => {
    const adjustedButtonProps = {
        disabled: disabled,
        component: disabled ? 'div' : undefined,
        onClick: disabled ? undefined : onClick,
    }
    return (
        <Tooltip title={tooltipText}>
            <ButtonBase {...other} {...adjustedButtonProps} />
        </Tooltip>
    )
}

export default ({
    startTime,
    endTime,
    booked,
    googleMeetLink,
    bookAction,
    cancelAction,
    hasFutureBooking,
}) => {
    const classes = useStyles({ booked })
    const [open, setOpen] = useState(false)
    const start = new Date(startTime)
    const end = new Date(endTime)
    const startMinutes = start.getMinutes()
    const endMinutes = end.getMinutes()

    console.log(hasFutureBooking)
    const openContent = () => (
        <>
            {booked ? (
                <div className={classes.meetingInfo}>
                    <a
                        className={classes.meetsLink}
                        href={googleMeetLink}
                        target="blank"
                    >
                        <Button
                            className={classes.joinButton}
                            variant="contained"
                            color="theme_orange"
                        >
                            JOIN MEETING
                        </Button>
                    </a>
                    <Button
                        className={classes.actionButton}
                        variant="contained"
                        color="error"
                        onClick={cancelAction}
                    >
                        CANCEL
                    </Button>
                </div>
            ) : (
                <ButtonWithTooltip
                    className={classes.actionButton}
                    variant="contained"
                    color="primary"
                    onClick={bookAction}
                    disabled={hasFutureBooking}
                    tooltipText="You can only have one upcoming meeting at a time."
                >
                    Book this meeting
                </ButtonWithTooltip>
            )}
        </>
    )

    // Make the meeting card openable if the meeting is in the future or if it is booked and hasn't ended yet
    const isOpenable =
        start.getTime() > new Date().getTime() ||
        (booked && end.getTime() > new Date().getTime())

    return (
        <div
            className={classes.meetingCard}
            key={startTime}
            onClick={() => (isOpenable ? setOpen(!open) : {})}
            style={!isOpenable ? { cursor: 'default' } : {}}
        >
            <p className={classes.meetingTime}>
                <span>{`${start.getHours()}:${
                    startMinutes === 0 ? '00' : startMinutes
                }`}</span>
                <span> - </span>
                <span>{`${end.getHours()}:${
                    endMinutes === 0 ? '00' : endMinutes
                }`}</span>
            </p>
            {open && openContent()}
        </div>
    )
}
