import * as React from 'react'

import { Grid } from '@material-ui/core'
import { PauseButton } from './PauseButton'
import { UnpauseButton } from './UnpauseButton'

interface PauseButtonSwitcherProps {
    setPause: (state: boolean) => void
    paused: boolean
}

export const PauseButtonSwitcher: React.FunctionComponent<PauseButtonSwitcherProps> = (
    props
) => {
    let show = (
        <div style={{ margin: '20px' }}>
            <Grid container={true} direction="row" justify="center">
                <PauseButton setPause={props.setPause} />
            </Grid>
        </div>
    )
    if (props.paused) {
        show = (
            <div style={{ margin: '20px' }}>
                <Grid container={true} direction="row" justify="center">
                    <UnpauseButton setPause={props.setPause} />
                </Grid>
            </div>
        )
    }
    return show
}
