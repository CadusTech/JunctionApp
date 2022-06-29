import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import FormGroup from '@material-ui/core/FormGroup'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import { useDispatch, useSelector } from 'react-redux'
import PageHeader from 'components/generic/PageHeader'
import GradientBox from 'components/generic/GradientBox'
import { Grid } from '@material-ui/core'

import * as DashboardSelectors from 'redux/dashboard/selectors'
import * as DashboardActions from 'redux/dashboard/actions'
import * as SnackbarActions from 'redux/snackbar/actions'

export default () => {
    const dispatch = useDispatch()
    const registration = useSelector(DashboardSelectors.registration)
    const checklistObjects = []

    const [checkboxState, setState] = React.useState({
        firstCheckboks: registration.checklist.items[0].checked,
        secondCheckboks: registration.checklist.items[1].checked,
        thirdCheckboks: registration.checklist.items[2].checked,
        fourthCheckboks: registration.checklist.items[3].checked,
    })

    const initializeChecklistObjects = () => {
        registration.checklist.items.forEach((item, index) => {
            checklistObjects.push({
                title: item.title,
                checked: Object.values(checkboxState)[index],
            })
        })
    }

    initializeChecklistObjects()
    console.log('listii: ', checklistObjects)

    const handleChange = event => {
        console.log('name:', event.target.name)
        console.log('value:', event.target.checked)
        setState({
            ...checkboxState,
            [event.target.name]: event.target.checked,
        })
        console.log('afterlistii', checklistObjects)
        const error = dispatch(
            DashboardActions.updateRegistrationChecklist(
                event.slug,
                checklistObjects,
            ),
        )
        if (error) {
            dispatch(SnackbarActions.error('Oops, something went wrong...'))
        } else {
            dispatch(SnackbarActions.success('Success!'))
        }
    }

    const renderCheckListBlock = () => {
        return (
            <Grid item xs={6}>
                <GradientBox color="theme_white" p={3}>
                    <FormControl>
                        <FormGroup>
                            {checklistObjects.map(value => (
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={value.checked}
                                            onChange={handleChange}
                                            name={value.title}
                                        />
                                    }
                                    label={value.title}
                                />
                            ))}
                        </FormGroup>
                    </FormControl>
                </GradientBox>
            </Grid>
        )
    }

    return (
        <>
            <PageHeader
                heading="Checklist"
                subheading="Tick the boxes you have successfully completed"
            />
            {renderCheckListBlock()}
        </>
    )
}
