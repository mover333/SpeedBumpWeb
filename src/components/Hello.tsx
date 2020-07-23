import * as React from 'react'
import { Button } from './Button'

const ngrokUrl: string = 'https://196d44862389.ngrok.io'

interface HelloProps {
    compiler: string
    framework: string
    bundler: string
}

interface HelloState {
    showButton: boolean
    info: string
}

interface HubMessage {
    timestamp: number
    messageType: string
}
interface AccelData extends HubMessage {
    x: number
    y: number
    z: number
    lat: number
    lon: number
    deviceGroup: string
    deviceLabel: string
}

interface ButtonData extends HubMessage {
    lat: number
    lon: number
}

export class Hello extends React.Component<HelloProps, HelloState> {
    private acc: LinearAccelerationSensor
    constructor(props: HelloProps) {
        super(props)
        this.state = {
            showButton: false,
            info: 'null',
        }
        this.acc = new LinearAccelerationSensor()
    }

    public render() {
        return (
            <div>
                <h1>
                    This is a {this.props.framework} application using{' '}
                    {this.props.compiler} with {this.props.bundler}
                </h1>
                <p>{this.state.info}</p>
                <button onClick={this.logButtonPress}>Speed Bump hit</button>
            </div>
        )
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
                    if (typeof LinearAccelerationSensor !== 'function') {
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

    private accelerationHandler = async () => {
        const accelerometer = this.acc
        let info
        const xyz = '[X, Y, Z]'
        info = xyz.replace('X', accelerometer.x && accelerometer.x.toFixed(3))
        info = info.replace('Y', accelerometer.y && accelerometer.y.toFixed(3))
        info = info.replace('Z', accelerometer.z && accelerometer.z.toFixed(3))
        this.setState({ info })

        const hubData: AccelData = {
            x: accelerometer.x,
            y: accelerometer.y,
            z: accelerometer.z,
            lat: 0,
            lon: 0,
            deviceGroup: '0',
            deviceLabel: '0',
            timestamp: Date.now(),
            messageType: 'accelerometer',
        }

        const headers = new Headers()
        headers.append('Content-Type', 'application/json')

        const response = await fetch(ngrokUrl + '/giveMeData', {
            method: 'POST',
            headers,
            body: JSON.stringify(hubData),
        })
        console.log('sent data res:', response.ok)
    }

    private logButtonPress = async () => {
        const buttonData: ButtonData = {
            lat: 0,
            lon: 0,
            timestamp: Date.now(),
            messageType: 'buttonPress',
        }

        const headers = new Headers()
        headers.append('Content-Type', 'application/json')

        const response = await fetch(ngrokUrl + '/giveMeData', {
            method: 'POST',
            headers,
            body: JSON.stringify(buttonData),
        })
        console.log('sent data res:', response.ok)
    }
}
