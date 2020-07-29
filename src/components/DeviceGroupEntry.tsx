import * as React from 'react'
import { TextField } from '@fluentui/react'

interface DeviceGroupEntryProps {
    setDeviceGroup: (deviceGroup: string) => void
}

interface DeviceGroupEntryState {
    deviceGroup: string
}

export class DeviceGroupEntry extends React.Component<
    DeviceGroupEntryProps,
    DeviceGroupEntryState
> {
    constructor(props: DeviceGroupEntryProps) {
        super(props)
        this.state = {
            deviceGroup: '',
        }
    }

    public render() {
        return (
            <TextField
                id="device-group"
                label="Device Group"
                onChange={this.handleChange}
                value={this.state.deviceGroup}
            />
        )
    }

    private handleChange = (
        event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
        newValue: string
    ) => {
        this.setState({ deviceGroup: newValue })
        this.props.setDeviceGroup(newValue)
    }
}
