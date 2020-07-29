import * as React from 'react'

import { ThemeProvider, createMuiTheme, Grid } from '@material-ui/core'
import { DeviceSelect } from './DeviceSelect'
import { DeviceGroupEntry } from './DeviceGroupEntry'
import { LocationAlerter } from './LocationAlerter'
import { LocationData } from '../models/Sensors'
import { isIOS } from 'react-device-detect'

interface SetupProps {
    setDeviceLabel: (deviceLabel: string) => void
    setDeviceGroup: (deviceLabel: string) => void
    validLabels: string[]
    location: LocationData
}

export const Setup: React.FunctionComponent<SetupProps> = (props) => {
    let show = (
        <ThemeProvider theme={theme}>
            <Grid
                container={true}
                direction="column"
                justify="center"
                alignItems="center"
                alignContent="center"
            >
                <h2 style={{ fontFamily: 'Roboto' }}>Device Setup</h2>
                <DeviceSelect
                    setDeviceLabel={props.setDeviceLabel}
                    validLabels={props.validLabels}
                />
                <div style={{ margin: '5px' }}>
                    <DeviceGroupEntry setDeviceGroup={props.setDeviceGroup} />
                </div>
                <div>
                    <LocationAlerter location={props.location} />
                </div>
            </Grid>
        </ThemeProvider>
    )
    if (isIOS)
        show = (
            <ThemeProvider theme={theme}>
                <Grid
                    container={true}
                    direction="column"
                    justify="center"
                    alignItems="center"
                    alignContent="center"
                >
                    <h2 style={{ fontFamily: 'Roboto' }}>Device Setup</h2>
                    <DeviceSelect
                        setDeviceLabel={props.setDeviceLabel}
                        validLabels={props.validLabels}
                    />
                    <div style={{ margin: '5px' }}>
                        <DeviceGroupEntry
                            setDeviceGroup={props.setDeviceGroup}
                        />
                    </div>
                    <div>
                        <p>Notifications not supported on IOS :(</p>
                    </div>
                </Grid>
            </ThemeProvider>
        )
    return show
}

const theme = createMuiTheme({
    palette: {
        primary: { main: '#2196f3' },
        secondary: { main: '#ff9800' },
    },
})
