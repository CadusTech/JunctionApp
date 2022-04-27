import React from 'react'
import { Box, Divider } from '@material-ui/core'

import GradientBox from 'components/generic/GradientBox'
import ChallengeSection from './ChallengeSection'

const ChallengeDetail = ({ partner, title, subtitle, logo, link}) => {
    return (
        <>
            <Box p={2}>
                <GradientBox color="theme_white" p={3}>
                    <ChallengeSection
                        partner={partner}
                        title={title}
                        subtitle={subtitle}
                        logo={logo}
                        link={link}
                    />
                </GradientBox>
            </Box>

            <Divider variant="middle" />
        </>
    )
}
export default ChallengeDetail
