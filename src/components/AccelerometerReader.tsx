import * as React from 'react'
import { isIOS13 } from 'react-device-detect'

import { AccelerometerData } from '../models/Sensors'
import { Button } from '@material-ui/core'

interface AccelerometerReaderProps {
    updateAcc: (acc: AccelerometerData) => void
}

interface AccelerometerReaderState {
    isIos: boolean
    iosIsEnabled: boolean
}
export class AccelerometerReader extends React.Component<
    AccelerometerReaderProps,
    AccelerometerReaderState
> {
    private acc: Accelerometer
    constructor(props: AccelerometerReaderProps) {
        super(props)
        this.state = {
            isIos: false,
            iosIsEnabled: false,
        }
    }

    public render() {
        let show = <div />
        if (this.state.isIos && !this.state.iosIsEnabled) {
            show = (
                <Button
                    variant="contained"
                    size="small"
                    color="secondary"
                    style={{ margin: '5px' }}
                    onClick={this.handleButton}
                >
                    Enable Accelerometer
                </Button>
            )
        }
        return show
    }

    public async componentDidMount() {
        try {
            if (isIOS13) {
                this.setState({ isIos: true, iosIsEnabled: false })
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
                        this.acc = new Accelerometer({ frequency: 30 })

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

    private accelerationHandlerIos = (event: DeviceMotionEvent) => {
        const accData: AccelerometerData = {
            x: event.accelerationIncludingGravity.x,
            y: event.accelerationIncludingGravity.y,
            z: event.accelerationIncludingGravity.z,
        }

        this.props.updateAcc(accData)
    }

    private handleButton = async () => {
        if (typeof DeviceMotionEvent.requestPermission === 'function') {
            const permissionState = await DeviceMotionEvent.requestPermission()

            if (permissionState === 'granted') {
                console.log('granted')
                window.addEventListener(
                    'devicemotion',
                    this.accelerationHandlerIos
                )
                this.setState({
                    iosIsEnabled: true,
                })
            }
        } else {
            console.log('Request permission not available')
        }
    }
}
