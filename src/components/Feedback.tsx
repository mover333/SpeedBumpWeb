import * as React from 'react'

import { SensorsData, AccelerometerData, LocationData } from '../models/Sensors'
import { SensorDisplay } from './SensorDisplay'
import { BumpButton } from './BumpButton'

interface FeedbackProps {
    sensorsData: SensorsData
    buttonPressed: () => void
}

export const Feedback: React.FunctionComponent<FeedbackProps> = (props) => {
    return (
        <div>
            <SensorDisplay
                accData={getAccData(props.sensorsData)}
                locationData={getLocData(props.sensorsData)}
            />
            <BumpButton buttonPressed={props.buttonPressed} />
        </div>
    )
}

const getAccData = (sensorData: SensorsData): AccelerometerData => {
    if (sensorData?.accelerometer) {
        return sensorData.accelerometer
    } else {
        return {
            x: 0,
            y: 0,
            z: 0,
        }
    }
}

const getLocData = (sensorData: SensorsData): LocationData => {
    if (sensorData?.location) {
        return sensorData.location
    } else {
        return {
            latitude: 0,
            longitude: 0,
            heading: 0,
            speed: 0,
            altitude: 0,
        }
    }
}
