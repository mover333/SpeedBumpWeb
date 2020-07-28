import * as React from 'react'
import ReactNoSleep from 'react-no-sleep'

import { Button, createMuiTheme, ThemeProvider } from '@material-ui/core'

interface UnpauseButtonProps {
    setPause: (state: boolean) => void
}

export const UnpauseButton: React.FunctionComponent<UnpauseButtonProps> = (
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
                        enable()
                        props.setPause(false)
                    }}
                >
                    Resume Readings
                </Button>
            )}
        </ReactNoSleep>
    )
}
