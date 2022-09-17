import React, { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { BOOK_MEETING, CANCEL_MEETING } from 'graphql/mutations/meetings'
import * as SnackbarActions from 'redux/snackbar/actions'
import { getMeetingslots } from 'graphql/queries/meetings'
import * as DashboardSelectors from 'redux/dashboard/selectors'
import MeetingCard from './MeetingCard'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'

import Button from 'components/generic/Button'
import {
    FormControl,
    InputLabel,
    makeStyles,
    MenuItem,
    Select,
} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { divide } from 'lodash-es'
import PageHeader from 'components/generic/PageHeader'
import theme from 'material-ui-theme'

const useStyles = makeStyles(theme => ({
    formWrapper: {
        width: '100%',
        marginBottom: '2em',
    },
    columns: {
        display: 'flex',
        width: '100%',
        height: 'max-content',
    },
    column: noOfEventDays => ({
        width: noOfEventDays > 2 ? '33%' : '50%',
    }),
    columnDay: {
        fontWeight: 'bold',
        fontSize: '1.5em',
        margin: '0.5em',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    columnContent: {
        height: '600px',
        padding: '0 0.5em',
        overflowX: 'scroll',
    },
    iconVisible: {
        padding: '0.5em 0.25em 0.2em 0.4em',
        cursor: 'pointer',
        borderRadius: '0.5em',
        '&:hover': {
            backgroundColor: 'lightgray',
        },
    },
    iconHidden: {
        padding: '0.5em 0.25em 0.2em 0.4em',
        visibility: 'hidden',
    },
    info: {
        marginLeft: theme.spacing(0.5),
        fontSize: '1rem',
    },
}))

export default ({ event, user }) => {
    const challenges = event.challenges
    const [challenge, setChallenge] = React.useState('')
    const [daysStartIndex, setDaysStartIndex] = useState(0)
    const [noOfDaysToShow, setNoOfDaysToShow] = useState(3)
    const dispatch = useDispatch()
    const [meetingsLoaded, setMeetingsLoaded] = useState(false)
    const [meetings, loading, error] = getMeetingslots({
        eventId: event._id,
        from: event.startTime,
        to: event.endTime,
        challengeId: challenge,
    })

    const startDate = new Date(event.startTime)
    const endDate = new Date(event.endTime)
    const timeDifference = endDate.getTime() - startDate.getTime()
    const dayDifference = Math.ceil(timeDifference / (1000 * 3600 * 24))
    const eventDays = {}
    for (let i = 0; i < dayDifference; i++) {
        const date = new Date(startDate)
        date.setDate(startDate.getDate() + i)
        eventDays[date.toISOString().split('T')[0]] = []
    }
    const [hasFutureBooking, setHasFutureBooking] = useState(false)
    const [days, setDays] = useState(eventDays)
    const classes = useStyles(dayDifference)
    const [cancelMeeting, cancelMeetingResult] = useMutation(CANCEL_MEETING, {
        onError: err => {
            const errors = err.graphQLErrors

            if (errors) {
                dispatch(
                    SnackbarActions.error('Unable to book meeting', {
                        errorMessages: Object.keys(errors).map(
                            key => `${key}: ${errors[key].message}`,
                        ),
                        persist: true,
                    }),
                )
            } else {
                dispatch(SnackbarActions.error('Unable to book meeting'))
            }
        },
        onCompleted: res => {
            if (!res) {
                dispatch(SnackbarActions.error('Failed to book meeting'))
            }
            setTimeout(() => {
                setDays(eventDays)
                setMeetingsLoaded(false)
                dispatch(SnackbarActions.success('Meeting booked successfully'))
            }, 500)
        },
    })
    const [bookMeeting, bookMeetingResult] = useMutation(BOOK_MEETING, {
        onError: err => {
            const errors = err.graphQLErrors

            if (errors) {
                dispatch(
                    SnackbarActions.error('Unable to book meeting', {
                        errorMessages: Object.keys(errors).map(
                            key => `${key}: ${errors[key].message}`,
                        ),
                        persist: true,
                    }),
                )
            } else {
                dispatch(SnackbarActions.error('Unable to book meeting'))
            }
        },
        onCompleted: res => {
            if (!res) {
                dispatch(SnackbarActions.error('Failed to book meeting'))
            }
            setTimeout(() => {
                setDays(eventDays)
                setMeetingsLoaded(false)
                dispatch(SnackbarActions.success('Meeting booked successfully'))
            }, 500)
        },
    })

    const handleChange = event => {
        if (event.target.value !== challenge) {
            // init days back to object with only days of event, but no meeting slots from challenge, as this will be repopulated
            setDays(eventDays)
            setMeetingsLoaded(false)
            setChallenge(event.target.value)
        } else {
            console.log('nothing changed')
        }
    }

    const team = useSelector(DashboardSelectors.team)
        ? user
        : useSelector(DashboardSelectors.team)
    const bookMeetingAction = meeting => {
        bookMeeting({
            variables: {
                meetingId: meeting._id,
                attendees: [...team.members, team.owner],
            },
        })
    }

    const sortMeetings = () => {
        if (!meetings || meetingsLoaded) return
        console.log('meetings', meetings)
        const daysObj = { ...days }
        meetings.forEach(meeting => {
            const meetingStartDate = new Date(meeting.startTime)
            const meetingDateStr = meetingStartDate.toISOString().split('T')[0]
            if (daysObj[meetingDateStr]) {
                daysObj[meetingDateStr] =
                    daysObj[meetingDateStr].concat(meeting)
            }
            if (
                meeting.attendees.includes(user.userId) &&
                new Date(meeting.startTime).getTime() > new Date().getTime()
            ) {
                setHasFutureBooking(true)
            }
        })
        console.log(daysObj)
        setDays(daysObj)
    }

    const cancelMeetingAction = meeting => {
        console.log('cancel meeting:', meeting._id)
        cancelMeeting({
            variables: { meetingId: meeting._id },
        })
    }

    if (meetings && !meetingsLoaded) {
        sortMeetings()
        setMeetingsLoaded(true)
    }

    const columnContent = (meetings, oneBooked) =>
        meetings ? (
            meetings.map((meeting, index) => (
                <MeetingCard
                    key={index}
                    startTime={meeting.startTime}
                    endTime={meeting.endTime}
                    booked={meeting.attendees.includes(user.userId)}
                    googleMeetLink={meeting.googleMeetLink}
                    bookAction={() => {
                        bookMeetingAction(meeting)
                    }}
                    cancelAction={() => {
                        cancelMeetingAction(meeting)
                    }}
                    hasFutureBooking={hasFutureBooking}
                />
            ))
        ) : (
            <></>
        )

    const dayStr = dateStr => {
        const dateObj = new Date(dateStr)
        return `${dateObj.getDate()}.${dateObj.getMonth() + 1}.`
    }

    const showNextDayRange = index => {
        console.log('yeeee forward')
        setDaysStartIndex(daysStartIndex + noOfDaysToShow)
    }

    const showPrevDayRange = index => {
        console.log('yeeee back')
        setDaysStartIndex(daysStartIndex - noOfDaysToShow)
    }

    const nextDayRangeButtonVisible = index =>
        index === noOfDaysToShow - 1 &&
        daysStartIndex + noOfDaysToShow < dayDifference

    const prevDayButtonVisible = index => index === 0 && daysStartIndex > 0

    return (
        <>
            <PageHeader
                heading="Meetings"
                subheading="Book a meeting with Partners to learn more about their Challenge."
            />
            {!challenge && (
                <div className={classes.info}>
                    Select a Challenge to see the available time slots.
                </div>
            )}
            <FormControl className={classes.formWrapper}>
                <InputLabel id="challenge-selection-label">
                    Challenge
                </InputLabel>
                <Select
                    labelId="challenge-selection-label"
                    id="challenge-selection"
                    value={challenge}
                    label="Choose a challenge"
                    onChange={handleChange}
                >
                    {challenges.map(c => (
                        <MenuItem value={c._id}>{c.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            {challenge && (
                <div className={classes.columns}>
                    {days &&
                        Object.keys(days)
                            .slice(
                                daysStartIndex,
                                daysStartIndex + noOfDaysToShow,
                            )
                            .map((day, index) => {
                                const columnMeetings = days[day]
                                return (
                                    <div className={classes.column} key={day}>
                                        <div className={classes.columnDay}>
                                            <div
                                                onClick={() => {
                                                    prevDayButtonVisible(
                                                        index,
                                                    ) && showPrevDayRange(index)
                                                }}
                                                className={
                                                    prevDayButtonVisible(index)
                                                        ? classes.iconVisible
                                                        : classes.iconHidden
                                                }
                                            >
                                                <ArrowBackIosIcon />
                                            </div>
                                            <p>{dayStr(day)}</p>
                                            <div
                                                onClick={() => {
                                                    nextDayRangeButtonVisible(
                                                        index,
                                                    ) && showNextDayRange(index)
                                                }}
                                                className={
                                                    nextDayRangeButtonVisible(
                                                        index,
                                                    )
                                                        ? classes.iconVisible
                                                        : classes.iconHidden
                                                }
                                            >
                                                <ArrowForwardIosIcon />
                                            </div>
                                        </div>
                                        <div
                                            className={classes.columnContent}
                                            style={{
                                                borderRight:
                                                    index == noOfDaysToShow - 1
                                                        ? 'none'
                                                        : '1px solid lightgray',
                                            }}
                                        >
                                            {columnContent(columnMeetings)}
                                        </div>
                                    </div>
                                )
                            })}
                </div>
            )}
        </>
    )
}
