import * as React from 'react'

import { IStackTokens, Stack, Text } from '@fluentui/react'

interface DeviceSetupDisplayProps {
    deviceGroup: string
    deviceLabel: string
}

const stackTokens: IStackTokens = { childrenGap: 10 }

export const DeviceSetupDisplay: React.FunctionComponent<DeviceSetupDisplayProps> = (
    props
) => {
    return (
        <Stack tokens={stackTokens}>
            <Text>Device Label: {props.deviceLabel}</Text>
            <Text>Device Group: {props.deviceGroup}</Text>
        </Stack>
    )
}
