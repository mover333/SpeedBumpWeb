import * as React from 'react'

import {
    FontIcon,
    mergeStyles,
    getTheme,
    Text,
    Spinner,
    SpinnerSize,
} from '@fluentui/react'
import { Grid } from '@material-ui/core'

interface StatusBarProps {
    paused: boolean
    transmitting: boolean
}

export const StatusBar: React.FunctionComponent<StatusBarProps> = (props) => {
    return props.paused ? (
        <div className={pauseClass}>
            <Grid
                container={true}
                direction="column"
                justify="center"
                alignItems="center"
                alignContent="center"
                style={{ minHeight: '100px' }}
            >
                <Text variant="xxLarge">Paused</Text>
            </Grid>
        </div>
    ) : props.transmitting ? (
        <div className={transClass}>
            <Grid
                container={true}
                direction="column"
                justify="center"
                alignItems="center"
                alignContent="center"
                style={{ minHeight: '100px' }}
            >
                <Text variant="xxLarge">Transmitting</Text>
                <Spinner size={SpinnerSize.large} style={{ padding: '10px' }} />
            </Grid>
        </div>
    ) : (
        <div className={pauseClass}>
            <Grid
                container={true}
                direction="column"
                justify="center"
                alignItems="center"
                alignContent="center"
                style={{ minHeight: '100px' }}
            >
                <Text variant="xxLarge">Waiting for Movement</Text>
            </Grid>
        </div>
    )
}
const theme = getTheme()
const transClass = mergeStyles([
    {
        backgroundColor: '#0078d4',
        color: theme.palette.white,
        lineHeight: '50px',
        padding: '0 20px',
        minHeight: ' 100px',
    },
])

const pauseClass = mergeStyles([
    {
        backgroundColor: '#a0aeb2',
        color: theme.palette.white,
        lineHeight: '50px',
        padding: '0 20px',
        minHeight: ' 100px',
    },
])
