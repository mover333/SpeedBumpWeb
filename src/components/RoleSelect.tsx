import * as React from 'react'

import { Dropdown, IDropdownOption } from '@fluentui/react'
import _ = require('lodash')

interface RoleSelectProps {
    setRole: (role: string) => void
}

interface RoleSelectState {
    selectedKeys: string[]
}

export class RoleSelect extends React.Component<
    RoleSelectProps,
    RoleSelectState
> {
    constructor(props: RoleSelectProps) {
        super(props)
        this.state = {
            selectedKeys: [],
        }
    }

    public render() {
        const options: IDropdownOption[] = [
            { key: 'accel', text: 'Acceleration Recording' },
            { key: 'bump', text: 'Speed Bump Recording' },
        ]

        return (
            <Dropdown
                placeholder="Select a mode"
                label="UI Mode"
                options={options}
                onChange={this.handleChange}
                multiSelect={true}
            />
        )
    }

    public componentDidUpdate(
        prevProps: RoleSelectProps,
        prevState: RoleSelectState
    ) {
        if (!_.isEqual(prevState.selectedKeys, this.state.selectedKeys)) {
            if (
                this.state.selectedKeys.includes('accel') &&
                this.state.selectedKeys.includes('bump')
            ) {
                this.props.setRole('both')
            } else {
                this.props.setRole(this.state.selectedKeys[0])
            }
        }
    }

    private handleChange = (
        event: React.FormEvent<HTMLDivElement>,
        item?: IDropdownOption,
        index?: number
    ) => {
        if (item) {
            this.setState({
                selectedKeys: item.selected
                    ? [...this.state.selectedKeys, item.key as string]
                    : this.state.selectedKeys.filter((key) => key !== item.key),
            })
        }
    }
}
