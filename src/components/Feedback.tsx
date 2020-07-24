import * as React from 'react'

import { SensorsData, AccelerometerData, LocationData } from '../models/Sensors'
import { SensorDisplay } from './SensorDisplay'
import { BumpButton } from './BumpButton'
import { Grid, ThemeProvider, createMuiTheme } from '@material-ui/core'
import { PauseButton } from './PauseButton'
import { PauseButtonSwitcher } from './PauseButtonSwitcher'

interface FeedbackProps {
    sensorsData: SensorsData
    buttonPressed: () => void
    setPause: (state: boolean) => void
    paused: boolean
}

export const Feedback: React.FunctionComponent<FeedbackProps> = (props) => {
    return (
        <ThemeProvider theme={theme}>
            <SensorDisplay
                accData={getAccData(props.sensorsData)}
                locationData={getLocData(props.sensorsData)}
                paused={props.paused}
            />
            <div style={{ margin: '20px' }}>
                <Grid container={true} direction="row" justify="center">
                    <BumpButton
                        buttonPressed={props.buttonPressed}
                        paused={props.paused}
                    />
                </Grid>
            </div>
            <div>
                <PauseButtonSwitcher
                    setPause={props.setPause}
                    paused={props.paused}
                />
            </div>
        </ThemeProvider>
    )
}

const getAccData = (sensorData: SensorsData): AccelerometerData => {
    if (sensorData?.accelerometer) {
        return sensorData.accelerometer
    } else {
        return {
            x: 0,
            y: 0,
            z: 0,
        }
    }
}

const getLocData = (sensorData: SensorsData): LocationData => {
    if (sensorData?.location) {
        return sensorData.location
    } else {
        return {
            latitude: 0,
            longitude: 0,
            heading: 0,
            speed: 0,
            altitude: 0,
        }
    }
}

const theme = createMuiTheme({
    palette: {
        primary: { main: '#2196f3' },
        secondary: { main: '#ff9800' },
    },
})
