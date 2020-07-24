import * as React from 'react'

import { AccelerometerData, LocationData } from '../models/Sensors'
import { AccelerometerReader } from './AccelerometerReader'
import { LocationReader } from './LocationReader'

interface SensorsProps {
    updateAcc: (acc: AccelerometerData) => void
    updateLocation: (loc: LocationData) => void
}

export const Sensors: React.FunctionComponent<SensorsProps> = (props) => {
    return (
        <div>
            <AccelerometerReader updateAcc={props.updateAcc} />
            <LocationReader updateLocation={props.updateLocation} />
        </div>
    )
}
