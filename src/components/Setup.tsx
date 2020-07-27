import * as React from 'react'

import { SensorsData, AccelerometerData, LocationData } from '../models/Sensors'
import { SensorDisplay } from './SensorDisplay'
import { BumpButton } from './BumpButton'
import { Grid, ThemeProvider, createMuiTheme } from '@material-ui/core'
import { PauseButton } from './PauseButton'
import { PauseButtonSwitcher } from './PauseButtonSwitcher'

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
