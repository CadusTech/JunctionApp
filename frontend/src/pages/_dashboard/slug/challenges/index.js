import React, { useState, useEffect } from 'react'
import { Box, Typography, Divider } from '@material-ui/core'
import { Helmet } from 'react-helmet'
import PageHeader from 'components/generic/PageHeader'
import PageWrapper from 'components/layouts/PageWrapper'

import ChallengeDetail from 'components/challenges/ChallengeDetail'
export default () => {

    useEffect(() => {}, [])

    return (
        <>
            <Helmet>
                <title>Junction App || Dashboard</title>
                
            </Helmet>
            <PageHeader
                heading="Challenges"
                subheading="Get to know the exciting Challenges and the wonderful Partners providing them!"
            />
            <PageWrapper loading={false}>
                <ChallengeDetail
                    partner={"Irma hei"}
                    title={"Uusi haaste"}
                    subtitle={"Tässä haasteessa voit haastaa itsesi"}
                    logo={null}
                    link={"true"} />
                <Box p={2}>
                    <Typography color="textSecondary" variant="subtitle1">
                        Anything you would like to see here in the future?
                        Contact us at partnerships@hackjunction.com with your
                        suggestion.
                    </Typography>
                </Box>
            </PageWrapper>
        </>
    )
}
