import * as React from 'react'
import { v4 as guid } from 'uuid'

import { SensorsData, AccelerometerData, LocationData } from '../models/Sensors'
import { Sensors } from './Sensors'
import { Feedback } from './Feedback'
import { AccelHubMessage, ButtonHubMessage } from '../models/HubData'
import { Setup } from './Setup'

interface SpeedBumpsState {
    sensors: SensorsData
    paused: boolean
    setupSelections: {
        deviceGroup: string
        deviceLabel: string
        role: string
        notificationsEnabled: boolean
    }
    validLabels: string[]
    transmitting: boolean
    setup: boolean
}

export class SpeedBumps extends React.Component<{}, SpeedBumpsState> {
    constructor() {
        super(null)
        this.state = {
            sensors: null,
            paused: true,
            setupSelections: {
                deviceGroup: null,
                deviceLabel: null,
                role: null,
                notificationsEnabled: null,
            },
            validLabels: [''],
            transmitting: false,
            setup: true,
        }
    }

    public render() {
        return (
            <div>
                {this.state.setup ? (
                    <Setup
                        setDeviceLabel={this.setDeviceLabel}
                        setDeviceGroup={this.setDeviceGroup}
                        setNotifications={this.setNotifications}
                        setRole={this.setRole}
                        validLabels={this.state.validLabels}
                        setSetup={this.setSetup}
                    />
                ) : (
                    <div />
                )}
            </div>
        )
    }

    public componentDidUpdate({}, prevState: SpeedBumpsState) {
        if (this.state.sensors?.accelerometer) {
            if (
                !this.state.setup &&
                this.state.sensors.accelerometer !==
                    prevState.sensors?.accelerometer &&
                !this.state.paused &&
                this.notCloseToZero(this.state.sensors.accelerometer)
            ) {
                this.sendAccToHub(this.state.sensors)
                if (!prevState.transmitting)
                    this.setState({ transmitting: true })
            } else {
                if (prevState.transmitting)
                    this.setState({ transmitting: false })
            }
        }
    }

    public async componentDidMount() {
        const response = await fetch('/deviceLabels', {
            method: 'GET',
        })

        const labels = await response.json()
        this.setState({ validLabels: labels })
    }

    private updateAcc = (accData: AccelerometerData) => {
        this.setState((prevState) => ({
            sensors: {
                accelerometer: accData,
                location: prevState.sensors?.location,
            },
        }))
    }

    private updateLocation = (locationData: LocationData) => {
        this.setState((prevState) => ({
            sensors: {
                accelerometer: prevState.sensors?.accelerometer,
                location: locationData,
            },
        }))
    }

    private sendAccToHub = async (data: SensorsData) => {
        const hubData: AccelHubMessage = {
            accelerometerData: {
                x: data.accelerometer.x,
                y: data.accelerometer.y,
                z: data.accelerometer.z,
            },
            locationData: this.getLocData(data),
            deviceGroup: this.state.setupSelections.deviceGroup,
            deviceLabel: this.state.setupSelections.deviceLabel,
            timestamp: Date.now(),
            messageType: 'accelerometer',
            id: guid(),
        }

        const headers = new Headers()
        headers.append('Content-Type', 'application/json')

        const response = await fetch('/giveMeData', {
            method: 'POST',
            headers,
            body: JSON.stringify(hubData),
        })

        console.log('Sent data to hub: ', hubData)
    }

    private notCloseToZero = (accData: AccelerometerData): boolean => {
        const threshhold = 0.25
        return !(
            Math.abs(accData.x) - threshhold < 0 &&
            Math.abs(accData.y) - threshhold < 0 &&
            Math.abs(accData.z - 9.7) - threshhold < 0
        )
    }

    private getLocData = (sensorData: SensorsData): LocationData => {
        if (sensorData?.location) {
            return sensorData.location
        } else {
            return {
                latitude: null,
                longitude: null,
                heading: null,
                speed: null,
                altitude: null,
            }
        }
    }

    private buttonPressed = async () => {
        const buttonData: ButtonHubMessage = {
            locationData: this.getLocData(this.state.sensors),
            timestamp: Date.now(),
            messageType: 'buttonPress',
            deviceGroup: this.state.setupSelections.deviceGroup,
            deviceLabel: this.state.setupSelections.deviceLabel,
            id: guid(),
        }

        const headers = new Headers()
        headers.append('Content-Type', 'application/json')

        const response = await fetch('/giveMeData', {
            method: 'POST',
            headers,
            body: JSON.stringify(buttonData),
        })
        console.log('sent data res:', response.ok)
    }

    private setPause = (paused: boolean) => {
        this.setState({ paused })
    }

    private setDeviceLabel = (label: string) => {
        this.setState({
            setupSelections: {
                deviceLabel: label,
                ...this.state.setupSelections,
            },
        })
    }

    private setDeviceGroup = (group: string) => {
        this.setState({
            setupSelections: {
                deviceGroup: group,
                ...this.state.setupSelections,
            },
        })
    }

    private setNotifications = (enabled: boolean) => {
        this.setState({
            setupSelections: {
                notificationsEnabled: enabled,
                ...this.state.setupSelections,
            },
        })
    }

    private setRole = (role: string) => {
        this.setState({
            setupSelections: {
                role,
                ...this.state.setupSelections,
            },
        })
    }

    private setSetup = (setup: boolean) => {
        this.setState({ setup })
    }
}
