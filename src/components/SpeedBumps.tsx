import * as React from 'react'
import { v4 as guid } from 'uuid'

import { SensorsData, AccelerometerData, LocationData } from '../models/Sensors'
import { Sensors } from './Sensors'
import { AccelHubMessage, ButtonHubMessage } from '../models/HubData'
import { Setup } from './Setup'
import { DeviceSetupDisplay } from './DeviceSetupDisplay'
import { Stack, Separator } from '@fluentui/react'
import { PauseButtonSwitcher } from './PauseButtonSwitcher'
import { StatusBar } from './StatusBar'
import { SensorDisplay } from './SensorDisplay'
import { LocationReader } from './LocationReader'
import { LocationDisplay } from './LocationDisplay'
import { BumpButton } from './BumpButton'
import { LocationAlerter } from './LocationAlerter'
import { isIOS } from 'react-device-detect'

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
    setupError: boolean
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
            setupError: false,
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
                        handleSubmit={this.handleSubmit}
                        setupError={this.state.setupError}
                    />
                ) : (
                    this.getRoleView()
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

    private getRoleView = () => {
        if (this.state.setupSelections.role === 'accel') {
            return (
                <div>
                    <Sensors
                        updateAcc={this.updateAcc}
                        updateLocation={this.updateLocation}
                    />
                    {this.state.setupSelections.notificationsEnabled ? (
                        <LocationAlerter
                            location={this.getLocData(this.state.sensors)}
                        />
                    ) : (
                        <div />
                    )}
                    <Stack tokens={{ childrenGap: 30 }}>
                        <DeviceSetupDisplay
                            deviceGroup={this.state.setupSelections.deviceGroup}
                            deviceLabel={this.state.setupSelections.deviceLabel}
                        />
                        <PauseButtonSwitcher
                            setPause={this.setPause}
                            paused={this.state.paused}
                        />
                        <Separator />
                        <StatusBar
                            paused={this.state.paused}
                            transmitting={this.state.transmitting}
                        />
                        <Separator />
                        <SensorDisplay
                            accData={this.getAccData(this.state.sensors)}
                            locationData={this.getLocData(this.state.sensors)}
                        />
                    </Stack>
                </div>
            )
        } else if (this.state.setupSelections.role === 'bump') {
            return (
                <div>
                    <LocationReader updateLocation={this.updateLocation} />
                    {this.state.setupSelections.notificationsEnabled ? (
                        <LocationAlerter
                            location={this.getLocData(this.state.sensors)}
                        />
                    ) : (
                        <div />
                    )}
                    <Stack tokens={{ childrenGap: 30 }}>
                        <DeviceSetupDisplay
                            deviceGroup={this.state.setupSelections.deviceGroup}
                            deviceLabel={this.state.setupSelections.deviceLabel}
                        />
                        <Separator />
                        <BumpButton buttonPressed={this.buttonPressed} />
                        <Separator />
                        <LocationDisplay
                            locData={this.getLocData(this.state.sensors)}
                        />
                    </Stack>
                </div>
            )
        } else if (this.state.setupSelections.role === 'both') {
            return (
                <div>
                    <Sensors
                        updateAcc={this.updateAcc}
                        updateLocation={this.updateLocation}
                    />
                    {this.state.setupSelections.notificationsEnabled ? (
                        <LocationAlerter
                            location={this.getLocData(this.state.sensors)}
                        />
                    ) : (
                        <div />
                    )}
                    <Stack tokens={{ childrenGap: 30 }}>
                        <DeviceSetupDisplay
                            deviceGroup={this.state.setupSelections.deviceGroup}
                            deviceLabel={this.state.setupSelections.deviceLabel}
                        />
                        <PauseButtonSwitcher
                            setPause={this.setPause}
                            paused={this.state.paused}
                        />
                        <Separator />
                        <StatusBar
                            paused={this.state.paused}
                            transmitting={this.state.transmitting}
                        />
                        <Separator />
                        <BumpButton buttonPressed={this.buttonPressed} />
                        <Separator />
                        <SensorDisplay
                            accData={this.getAccData(this.state.sensors)}
                            locationData={this.getLocData(this.state.sensors)}
                        />
                    </Stack>
                </div>
            )
        } else {
            return <div />
        }
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

    private getAccData = (sensorData: SensorsData): AccelerometerData => {
        if (sensorData?.accelerometer) {
            return sensorData.accelerometer
        } else {
            return {
                x: null,
                y: null,
                z: null,
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
                ...this.state.setupSelections,
                deviceLabel: label,
            },
        })
    }

    private setDeviceGroup = (group: string) => {
        this.setState({
            setupSelections: {
                ...this.state.setupSelections,
                deviceGroup: group,
            },
        })
    }

    private setNotifications = (enabled: boolean) => {
        this.setState({
            setupSelections: {
                ...this.state.setupSelections,
                notificationsEnabled: enabled,
            },
        })
    }

    private setRole = (role: string) => {
        this.setState({
            setupSelections: {
                ...this.state.setupSelections,
                role,
            },
        })
    }

    private handleSubmit = () => {
        const needNot = !isIOS
        if (
            this.state.setupSelections.deviceGroup === null ||
            this.state.setupSelections.deviceLabel === null ||
            (this.state.setupSelections.notificationsEnabled === null &&
                needNot) ||
            this.state.setupSelections.role === null
        ) {
            this.setState({ setupError: true })
        } else {
            this.setState({ setup: false })
        }
    }
}
