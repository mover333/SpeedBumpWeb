import * as React from 'react'

import { Button, createMuiTheme, ThemeProvider } from '@material-ui/core'

interface PauseButtonProps {
    setPause: (state: boolean) => void
}

export const PauseButton: React.FunctionComponent<PauseButtonProps> = (
    props
) => {
    return (
        <a
            onClick={() => {
                props.setPause(true)
            }}
        >
            <Button variant="contained" size="small" color="secondary">
                Pause Readings
            </Button>
        </a>
    )
}
