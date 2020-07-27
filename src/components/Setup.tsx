import * as React from 'react'

import { ThemeProvider, createMuiTheme } from '@material-ui/core'

interface SetupProps {
    setDeviceLabel: (deviceLabel: string) => void
    setDeviceGroup: (deviceLabel: string) => void
}

export const Setup: React.FunctionComponent<SetupProps> = (props) => {
    return (
        <ThemeProvider theme={theme}>
            <div />
        </ThemeProvider>
    )
}

const theme = createMuiTheme({
    palette: {
        primary: { main: '#2196f3' },
        secondary: { main: '#ff9800' },
    },
})
