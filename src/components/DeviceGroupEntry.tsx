import * as React from 'react'

import {
    FormControl,
    InputLabel,
    Select,
    createStyles,
    makeStyles,
    MenuItem,
    Theme,
    TextField,
    Button,
    Grid,
} from '@material-ui/core'

interface DeviceGroupEntryProps {
    setDeviceGroup: (deviceLabel: string) => void
}

interface DeviceGroupEntryState {
    deviceGroup: string
    lastSentDeviceGroup: string
}

export class DeviceGroupEntry extends React.Component<
    DeviceGroupEntryProps,
    DeviceGroupEntryState
> {
    constructor(props: DeviceGroupEntryProps) {
        super(props)
        this.state = {
            deviceGroup: '',
            lastSentDeviceGroup: '',
        }
    }

    public render() {
        return (
            <Grid
                container={true}
                direction="column"
                justify="center"
                alignItems="center"
                alignContent="center"
            >
                <TextField
                    id="device-group"
                    label="Device Group"
                    variant="outlined"
                    onChange={this.handleChange}
                    value={this.state.deviceGroup}
                />
                <p style={{ fontFamily: 'Roboto' }}>
                    Device Group: {this.state.lastSentDeviceGroup}
                </p>
                <a onClick={this.handleSubmit}>
                    <Button
                        variant="contained"
                        size="small"
                        color="secondary"
                        style={{ margin: '5px' }}
                    >
                        Update Device Group
                    </Button>
                </a>
            </Grid>
        )
    }

    private handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const group = event.target.value as string
        this.setState({ deviceGroup: group })
    }

    private handleSubmit = () => {
        this.props.setDeviceGroup(this.state.deviceGroup)
        this.setState({ lastSentDeviceGroup: this.state.deviceGroup })
    }
}
