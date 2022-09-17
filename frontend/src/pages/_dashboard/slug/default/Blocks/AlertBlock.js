import React from 'react'
import { useSelector } from 'react-redux'
import { Grid, Typography } from '@material-ui/core'
import * as DashboardSelectors from 'redux/dashboard/selectors'
import GradientBox from 'components/generic/GradientBox'
import { Alerts } from '../../../../../components/messaging/alerts'

const testAlerts = [
    {
        content: 'Tässä vanhin ilmoitus',
        sentAt: new Date(2022, 2, 10, 4, 26),
    },
    {
        content: 'Tässä kaikista tokaks uusin ilmoitus',
        sentAt: new Date(2022, 9, 15, 11, 26),
    },
    {
        content:
            'Kaikista uusin ilmotus wautsi wautsi jeejee muistakaaa nyt palauttaa se projekti tai ette voi voittaa voivoivoi cmoon hackatchon jeeee',
        sentAt: new Date(2022, 9, 17, 2, 46),
    },
    {
        content: 'Tässä kaikista kolmanneks uusin ilmoitus',
        sentAt: new Date(2022, 4, 12, 2, 11),
    },
    {
        content: 'Tässä kaikista kolmanneks uusin ilmoitus',
        sentAt: new Date(2022, 4, 12, 2, 19),
    },
    {
        content: 'Tässä kaikista kolmanneks uusin ilmoitus',
        sentAt: new Date(2022, 4, 12, 2, 15),
    },
]

export default ({ alerts = testAlerts }) => {
    return (
        <Grid
            direction="column"
            alignItems="stretch"
            item
            xs={8}
            style={{ marginLeft: '20px' }}
        >
            <GradientBox
                style={{ height: '0', minHeight: '100%', overflow: 'scroll' }}
                color="theme_white"
                p={3}
            >
                <Typography variant="button" gutterBottom>
                    Announcements
                </Typography>
                <Alerts alerts={alerts} />
            </GradientBox>
        </Grid>
    )
}
