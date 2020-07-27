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
    deviceGroup: string
    deviceLabel: string
    validLabels: string[]
}

export class SpeedBumps extends React.Component<{}, SpeedBumpsState> {
    constructor() {
        super(null)
        this.state = {
            sensors: null,
            paused: false,
            deviceGroup: '0',
            deviceLabel: '0',
            validLabels: [''],
        }
    }

    public render() {
        return (
            <div>
                <Sensors
                    updateAcc={this.updateAcc}
                    updateLocation={this.updateLocation}
                />
                <Setup
                    validLabels={this.state.validLabels}
                    setDeviceGroup={this.setDeviceGroup}
                    setDeviceLabel={this.setDeviceLabel}
                />
                <Feedback
                    sensorsData={this.state.sensors}
                    buttonPressed={this.buttonPressed}
                    setPause={this.setPause}
                    paused={this.state.paused}
                />
            </div>
        )
    }

    public componentDidUpdate({}, prevState: SpeedBumpsState) {
        if (this.state.sensors?.accelerometer) {
            if (
                this.state.sensors.accelerometer !==
                    prevState.sensors?.accelerometer &&
                !this.state.paused &&
                this.notCloseToZero(this.state.sensors.accelerometer)
            ) {
                this.sendAccToHub(
                    this.state.sensors,
                    this.state.deviceGroup,
                    this.state.deviceLabel
                )
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

    private sendAccToHub = async (
        data: SensorsData,
        deviceGroup: string,
        deviceLabel: string
    ) => {
        const hubData: AccelHubMessage = {
            accelerometerData: {
                x: data.accelerometer.x,
                y: data.accelerometer.y,
                z: data.accelerometer.z,
            },
            locationData: this.getLocData(data),
            deviceGroup,
            deviceLabel,
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
                latitude: 0,
                longitude: 0,
                heading: 0,
                speed: 0,
                altitude: 0,
            }
        }
    }

    private buttonPressed = async () => {
        const buttonData: ButtonHubMessage = {
            locationData: this.getLocData(this.state.sensors),
            timestamp: Date.now(),
            messageType: 'buttonPress',
            deviceGroup: '0',
            deviceLabel: '0',
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
        this.setState({ deviceLabel: label })
    }

    private setDeviceGroup = (group: string) => {
        this.setState({ deviceGroup: group })
    }
}
