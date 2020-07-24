import * as React from 'react'

import { Button, createMuiTheme, ThemeProvider } from '@material-ui/core'

interface UnpauseButtonProps {
    setPause: (state: boolean) => void
}

export const UnpauseButton: React.FunctionComponent<UnpauseButtonProps> = (
    props
) => {
    return (
        <a
            onClick={() => {
                props.setPause(false)
            }}
        >
            <Button variant="contained" size="small" color="secondary">
                Resume Readings
            </Button>
        </a>
    )
}
