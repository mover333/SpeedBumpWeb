import * as React from 'react'

import { Dropdown, IDropdownOption } from '@fluentui/react'

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
            deviceLabel: null,
        }
    }

    public render() {
        const options: IDropdownOption[] = this.props.validLabels.map(
            (value: string) => {
                return { key: value, text: value }
            }
        )

        return (
            <Dropdown
                placeHolder="Select a device"
                label="Device Label"
                options={options}
                onChange={this.handleChange}
            />
        )
    }

    private handleChange = (
        event: React.FormEvent<HTMLDivElement>,
        option?: IDropdownOption,
        index?: number
    ) => {
        const label = option.key as string
        this.setState({ deviceLabel: label })
        this.props.setDeviceLabel(label)
    }
}
