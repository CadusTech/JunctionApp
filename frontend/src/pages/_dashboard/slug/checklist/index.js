import React, { useCallback, useEffect, useRef } from 'react'
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
import { componentsToColor } from 'pdf-lib'
import { ContactSupportOutlined } from '@material-ui/icons'

export default () => {
    const dispatch = useDispatch()
    const registration_event = useSelector(DashboardSelectors.event)
    const registration = useSelector(DashboardSelectors.registration)
    const loaded = useRef(false)

    const [checkboxState, setCheckboxState] = React.useState({})

    useEffect(() => {
        if (!loaded.current) {
            const copy = checkboxState
            registration.checklist.items.forEach((item, index) => {
                copy['checkbox' + (index + 1)] = item.checked
                setCheckboxState(copy)
            })
            loaded.current = true
        }
    }, [checkboxState, registration.checklist.items])

    const handleChange = (event, index) => {
        setCheckboxState({
            ...checkboxState,
            [event.target.name]: event.target.checked,
        })
        const data = {
            name: 'checkbox' + (index + 1),
            title: registration.checklist.items[index].title,
            checked: event.target.checked,
        }
        console.log('this is data: ', data)
        const error = dispatch(
            DashboardActions.updateRegistrationChecklist(
                registration_event.slug,
                data,
                index,
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
                            {Object.keys(checkboxState).map((value, index) => (
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={checkboxState[value]}
                                            onChange={e =>
                                                handleChange(e, index)
                                            }
                                            name={value}
                                        />
                                    }
                                    key={index}
                                    label={
                                        registration.checklist.items[index]
                                            .title
                                    }
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
