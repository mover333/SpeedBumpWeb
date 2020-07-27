import * as React from 'react'

import { AccelerometerData } from '../models/Sensors'

interface AccelerometerReaderProps {
    updateAcc: (acc: AccelerometerData) => void
}

export class AccelerometerReader extends React.Component<
    AccelerometerReaderProps,
    {}
> {
    private acc: Accelerometer
    constructor(props: AccelerometerReaderProps) {
        super(props)
        this.acc = new Accelerometer({ frequency: 30 })
    }

    public render() {
        return <div />
    }

    public componentDidMount() {
        try {
            navigator.permissions
                .query({ name: 'accelerometer' })
                .then((result) => {
                    if (result.state === 'denied') {
                        console.log(
                            'Permission to use accelerometer sensor is denied.'
                        )
                        return
                    }
                    // Use the sensor.
                    if (typeof Accelerometer !== 'function') {
                        console.log('Accelerometer is not found')
                        return
                    }

                    this.acc.addEventListener('error', (event: any) => {
                        // Handle runtime errors.
                        if (event.error.name === 'NotAllowedError') {
                            console.log({
                                info: 'Permission to access sensor was denied.',
                            })
                        } else if (event.error.name === 'NotReadableError') {
                            console.log({
                                info: 'Cannot connect to the sensor.',
                            })
                        }
                    })
                    this.acc.addEventListener('reading', (e) => {
                        this.accelerationHandler()
                    })
                    this.acc.start()
                    console.log('Accelerometer started')
                })
        } catch (err) {
            console.log({ info: err })
        }
    }

    private accelerationHandler = () => {
        const accData: AccelerometerData = {
            x: this.acc.x,
            y: this.acc.y,
            z: this.acc.z,
        }

        this.props.updateAcc(accData)
    }
}
