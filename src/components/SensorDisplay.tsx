import * as React from 'react'

import { AccelerometerData, LocationData } from '../models/Sensors'

interface SensorDisplayProps {
    accData: AccelerometerData
    locationData: LocationData
}

export const SensorDisplay: React.FunctionComponent<SensorDisplayProps> = (
    props
) => {
    return <p>{getAccDisplay(props.accData)}</p>
}

const getAccDisplay = (accData: AccelerometerData): string => {
    let xyz = '[X, Y, Z]'
    xyz = xyz.replace('X', accData.x && accData.x.toFixed(3))
    xyz = xyz.replace('Y', accData.y && accData.y.toFixed(3))
    xyz = xyz.replace('Z', accData.z && accData.z.toFixed(3))
    return xyz
}
