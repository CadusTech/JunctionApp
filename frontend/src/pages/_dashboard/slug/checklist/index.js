import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import { useSelector } from 'react-redux'

import * as DashboardSelectors from 'redux/dashboard/selectors'

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: theme.spacing(3),
    },
}))

export default () => {
    const classes = useStyles()
    const hackathonEvent = useSelector(DashboardSelectors.event)

    const [state, setState] = React.useState({
        firstCB: false,
        secondCB: false,
        thirdCB: false,
        fourthCB: false,
        fifthCB: false,
    })

    const handleChange = event => {
        setState({ ...state, [event.target.name]: event.target.checked })
    }

    const checklistObjectsOffline = [
        {
            name: 'first checkbox',
            state: state[0],
            label: 'Start searching for team at the venue',
        },
        {
            name: 'second checkbox',
            state: state[1],
            label: 'Start coding with your team',
        },
        {
            name: 'third checkbox',
            state: state[2],
            label: 'Submit your code',
        },
        {
            name: 'fourth checkbox',
            state: state[3],
            label: 'Evaluate at least 5 other projects',
        },
        {
            name: 'fifth checkbox',
            state: state[4],
            label: 'Congratulate yourself for a great hackathon success',
        },
    ]

    const checklistObjectsOnline = [
        {
            name: 'first checkbox',
            state: state[0],
            label: 'Start searching for team in the Junction website',
        },
        {
            name: 'second checkbox',
            state: state[1],
            label: 'Start coding with your team',
        },
        {
            name: 'third checkbox',
            state: state[2],
            label: 'Submit your code',
        },
        {
            name: 'fourth checkbox',
            state: state[3],
            label: 'Evaluate at least 5 other projects',
        },
        {
            name: 'fifth checkbox',
            state: state[4],
            label: 'Congratulate yourself for a great hackathon success',
        },
    ]

    const correctChecklistObjects =
        hackathonEvent.eventType === 'online'
            ? checklistObjectsOnline
            : checklistObjectsOffline

    return (
        <div className={classes.root}>
            <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Event checklist</FormLabel>
                <FormGroup>
                    {correctChecklistObjects.map(value => (
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={value.state}
                                    onChange={handleChange}
                                    name={value.name}
                                />
                            }
                            label={value.label}
                        />
                    ))}
                </FormGroup>
            </FormControl>
        </div>
    )
}
