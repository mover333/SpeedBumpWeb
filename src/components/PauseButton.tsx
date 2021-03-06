import * as React from 'react'
import ReactNoSleep from 'react-no-sleep'

import { FontIcon, mergeStyles } from '@fluentui/react'

interface PauseButtonProps {
    setPause: (state: boolean) => void
}

const iconClass = mergeStyles({
    fontSize: 50,
    height: 50,
    width: 50,
})

export const PauseButton: React.FunctionComponent<PauseButtonProps> = (
    props
) => {
    return (
        <ReactNoSleep>
            {({ isOn, enable, disable }) => (
                <FontIcon
                    iconName="Pause"
                    className={iconClass}
                    onClick={() => {
                        disable()
                        props.setPause(true)
                    }}
                >
                    Pause Readings
                </FontIcon>
            )}
        </ReactNoSleep>
    )
}
