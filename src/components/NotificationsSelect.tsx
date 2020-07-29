import * as React from 'react'

import { Dropdown, IDropdownOption } from '@fluentui/react'

interface NotificationSelectProps {
    setNotification: (enabled: boolean) => void
}

interface NotificationSelectState {
    enabled: boolean
}

export class NotificationSelect extends React.Component<
    NotificationSelectProps,
    NotificationSelectState
> {
    constructor(props: NotificationSelectProps) {
        super(props)
        this.state = {
            enabled: false,
        }
    }

    public render() {
        const options: IDropdownOption[] = [
            { key: 'enabled', text: 'Enabled' },
            { key: 'disabled', text: 'Disabled' },
        ]

        return (
            <Dropdown
                placeHolder="Select a mode"
                label="Speed Bump Notification Alerts"
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
        const value = option.key as string
        const enabled = value === 'enabled'
        this.setState({ enabled })
        this.props.setNotification(enabled)
    }
}
