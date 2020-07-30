import * as React from 'react'
import { isIOS } from 'react-device-detect'

import { DeviceSelect } from './DeviceSelect'
import { DeviceGroupEntry } from './DeviceGroupEntry'
import { NotificationSelect } from './NotificationsSelect'
import { RoleSelect } from './RoleSelect'
import {
    PrimaryButton,
    IStackTokens,
    Stack,
    Text,
    Separator,
} from '@fluentui/react'
import { Grid } from '@material-ui/core'

interface SetupProps {
    setDeviceLabel: (deviceLabel: string) => void
    setDeviceGroup: (deviceGroup: string) => void
    setNotifications: (enabled: boolean) => void
    setRole: (role: string) => void
    handleSubmit: () => void
    validLabels: string[]
    setupError: boolean
}

const stackTokens: IStackTokens = { childrenGap: 10 }

export const Setup: React.FunctionComponent<SetupProps> = (props) => {
    return (
        <Stack tokens={stackTokens}>
            <Grid
                container={true}
                direction="column"
                justify="center"
                alignItems="center"
                alignContent="center"
            >
                <Text variant="xxLarge">Speed Bump Detection</Text>
            </Grid>
            <Separator />
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
            <PrimaryButton
                onClick={() => {
                    props.handleSubmit()
                }}
            >
                Submit
            </PrimaryButton>
            {props.setupError ? (
                <Text style={{ color: 'red' }}>
                    Some fields are missing, please try again
                </Text>
            ) : (
                <div />
            )}
        </Stack>
    )
}
