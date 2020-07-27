import * as React from 'react'

import {
    FormControl,
    InputLabel,
    Select,
    createStyles,
    makeStyles,
    MenuItem,
    Theme,
} from '@material-ui/core'

interface DeviceSelectProps {
    setDeviceLabel: (deviceLabel: string) => void
    validLabels: string[]
}

interface DeviceSelectState {
    deviceLabel: string
}

export class DeviceSelect extends React.Component<
    DeviceSelectProps,
    DeviceSelectState
> {
    constructor(props: DeviceSelectProps) {
        super(props)
        this.state = {
            deviceLabel: props.validLabels[0],
        }
    }

    public render() {
        return (
            <FormControl
                style={{
                    margin: '10px',
                    minWidth: '120px',
                }}
            >
                <InputLabel id="device-label-select">Device Label</InputLabel>
                <Select
                    labelId="device-label-select"
                    id="device-label-select-id"
                    value={this.state.deviceLabel}
                    onChange={this.handleChange}
                >
                    {this.props.validLabels.map(
                        (value: string, index: number) => {
                            return (
                                <MenuItem value={value} key={index}>
                                    {value}
                                </MenuItem>
                            )
                        }
                    )}
                </Select>
            </FormControl>
        )
    }

    private handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        const label = event.target.value as string
        this.setState({ deviceLabel: label })
        this.props.setDeviceLabel(label)
    }
}
