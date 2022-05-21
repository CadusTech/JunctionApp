import { Box, makeStyles } from '@material-ui/core'
import Button from 'components/generic/Button'
import Markdown from 'components/generic/Markdown'
import React from 'react'

const useStyles = makeStyles(theme => ({
    companyLogo: {
        width: '200px',
    },
    outboundLink: {
        '& a': {
            textDecoration: 'none !important',
        },
    },
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        [theme.breakpoints.up('md')]: {
            flexDirection: 'row',
            alignItems: 'flex-start',
        },
    },
}))

export default ({
    onClose,
    description,
    title,
    partner,
    insights,
    resources,
    prizes,
    criteria,
    companyInfo,
    logo,
}) => {
    const classes = useStyles()

    return (
        <>
            <Button onClick={onClose}>Close</Button>
            <Box p={3}>
                {logo && (
                    <img
                        alt={partner}
                        src={logo.url}
                        className={classes.companyLogo}
                    />
                )}
            </Box>
            <h1>{title}</h1>
            {description && (
                <>
                    <h2>The challenge</h2>
                    <Markdown source={description} />
                </>
            )}
            {insights && (
                <>
                    <h2>Insights</h2>
                    <Markdown source={insights} />
                </>
            )}
            {resources && (
                <>
                    <h2>What we'll bring</h2>
                    <Markdown source={resources} />
                </>
            )}
            {prizes && (
                <>
                    <h2>The Prizes</h2>
                    <Markdown source={prizes} />
                </>
            )}
            {criteria && (
                <>
                    <h2>Judging criteria</h2>
                    <Markdown source={criteria} />
                </>
            )}
            {companyInfo && (
                <>
                    <h2>About the company</h2>
                    <Markdown source={companyInfo} />
                </>
            )}
        </>
    )
}
