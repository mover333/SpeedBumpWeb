import * as React from 'react'

import { Dropdown, IDropdownOption } from '@fluentui/react'

interface RoleSelectProps {
    setRole: (role: string) => void
}

interface RoleSelectState {
    role: string
}

export class RoleSelect extends React.Component<
    RoleSelectProps,
    RoleSelectState
> {
    constructor(props: RoleSelectProps) {
        super(props)
        this.state = {
            role: null,
        }
    }

    public render() {
        const options: IDropdownOption[] = [
            { key: 'accel', text: 'Acceleration Recording' },
            { key: 'bump', text: 'Speed Bump Recording' },
            { key: 'both', text: 'Both' },
        ]

        return (
            <Dropdown
                placeholder="Select a mode"
                label="UI Mode"
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
        const role = option.key as string
        this.setState({ role })
        this.props.setRole(role)
    }
}
