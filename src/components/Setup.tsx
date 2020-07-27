import * as React from 'react'

import { ThemeProvider, createMuiTheme, Grid } from '@material-ui/core'
import { DeviceSelect } from './DeviceSelect'
import { DeviceGroupEntry } from './DeviceGroupEntry'

interface SetupProps {
    setDeviceLabel: (deviceLabel: string) => void
    setDeviceGroup: (deviceLabel: string) => void
    validLabels: string[]
}

export const Setup: React.FunctionComponent<SetupProps> = (props) => {
    return (
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
            </Grid>
        </ThemeProvider>
    )
}

const theme = createMuiTheme({
    palette: {
        primary: { main: '#2196f3' },
        secondary: { main: '#ff9800' },
    },
})
