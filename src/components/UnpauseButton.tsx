import * as React from 'react'
import ReactNoSleep from 'react-no-sleep'

import { FontIcon, mergeStyles } from '@fluentui/react'

interface UnpauseButtonProps {
    setPause: (state: boolean) => void
}

const iconClass = mergeStyles({
    fontSize: 50,
    height: 50,
    width: 50,
    margin: '0 25px',
})

export const UnpauseButton: React.FunctionComponent<UnpauseButtonProps> = (
    props
) => {
    return (
        <ReactNoSleep>
            {({ isOn, enable, disable }) => (
                <FontIcon
                    iconName="Play"
                    className={iconClass}
                    onClick={() => {
                        disable()
                        props.setPause(false)
                    }}
                >
                    Resume Readings
                </FontIcon>
            )}
        </ReactNoSleep>
    )
}
