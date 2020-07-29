import * as React from 'react'
import { isIOS } from 'react-device-detect'

import { Grid } from '@material-ui/core'
import { DeviceSelect } from './DeviceSelect'
import { DeviceGroupEntry } from './DeviceGroupEntry'
import { NotificationSelect } from './NotificationsSelect'
import { RoleSelect } from './RoleSelect'
import { Button } from '@fluentui/react'

interface SetupProps {
    setDeviceLabel: (deviceLabel: string) => void
    setDeviceGroup: (deviceGroup: string) => void
    setNotifications: (enabled: boolean) => void
    setRole: (role: string) => void
    setSetup: (setup: boolean) => void
    validLabels: string[]
}

export const Setup: React.FunctionComponent<SetupProps> = (props) => {
    return (
        <Grid
            container={true}
            direction="column"
            justify="center"
            alignItems="center"
            alignContent="center"
        >
            <DeviceSelect
                setDeviceLabel={props.setDeviceLabel}
                validLabels={props.validLabels}
            />
            <DeviceGroupEntry setDeviceGroup={props.setDeviceGroup} />
            {isIOS ? (
                <p>Notifications not supported on IOS :(</p>
            ) : (
                <NotificationSelect setNotification={props.setNotifications} />
            )}

            <RoleSelect setRole={props.setRole} />
            <Button
                onClick={() => {
                    props.setSetup(false)
                }}
            >
                Submit
            </Button>
        </Grid>
    )
}
