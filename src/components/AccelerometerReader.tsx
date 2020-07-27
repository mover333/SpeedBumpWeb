import * as React from 'react'
import { isIOS13 } from 'react-device-detect'

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
            if (isIOS13) {
                if (typeof DeviceMotionEvent.requestPermission === 'function') {
                    DeviceMotionEvent.requestPermission()
                        .then((permissionState) => {
                            if (permissionState === 'granted') {
                                window.addEventListener(
                                    'devicemotion',
                                    () => {}
                                )
                            }
                        })
                        .catch(console.error)
                } else {
                    console.log('Request permission not available')
                }
            } else {
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
                                console.log(
                                    'Permission to access sensor was denied.'
                                )
                            } else if (
                                event.error.name === 'NotReadableError'
                            ) {
                                console.log('Cannot connect to the sensor.')
                            }
                        })
                        this.acc.addEventListener('reading', (e) => {
                            this.accelerationHandler()
                        })
                        this.acc.start()
                        console.log('Accelerometer started')
                    })
            }
        } catch (err) {
            console.log('Error:', err.message)
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
