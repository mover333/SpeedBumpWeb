import * as React from 'react'
import { Button } from './Button'

interface HelloProps {
    compiler: string
    framework: string
    bundler: string
}

interface HelloState {
    showButton: boolean
    info: string
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
        const elements: React.ReactElement<any>[] = []
        if (this.state.showButton) {
            elements.push(
                <div>
                    <Button hideButton={this.hideButton} />
                </div>
            )
        } else {
            elements.push(
                <div>
                    <h1>
                        This is a {this.props.framework} application using{' '}
                        {this.props.compiler} with {this.props.bundler}
                    </h1>
                    <p>{this.state.info}</p>
                    <a onClick={this.showButton}>Click me!</a>
                </div>
            )
        }

        return elements
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

    private accelerationHandler = () => {
        const accelerometer = this.acc
        let info
        const xyz = '[X, Y, Z]'
        info = xyz.replace('X', accelerometer.x && accelerometer.x.toFixed(3))
        info = info.replace('Y', accelerometer.y && accelerometer.y.toFixed(3))
        info = info.replace('Z', accelerometer.z && accelerometer.z.toFixed(3))
        this.setState({ info })
    }

    private showButton = () => {
        this.setState({ showButton: true })
    }

    private hideButton = () => {
        this.setState({ showButton: false })
    }
}
