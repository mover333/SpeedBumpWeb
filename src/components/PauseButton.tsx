import * as React from 'react'
import ReactNoSleep from 'react-no-sleep'

import { Button, createMuiTheme, ThemeProvider } from '@material-ui/core'

interface PauseButtonProps {
    setPause: (state: boolean) => void
}

export const PauseButton: React.FunctionComponent<PauseButtonProps> = (
    props
) => {
    return (
        <ReactNoSleep>
            {({ isOn, enable, disable }) => (
                <Button
                    variant="contained"
                    size="small"
                    color="secondary"
                    onClick={() => {
                        disable()
                        props.setPause(true)
                    }}
                >
                    Pause Readings
                </Button>
            )}
        </ReactNoSleep>
    )
}
