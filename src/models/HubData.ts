import { AccelerometerData, LocationData } from './Sensors'

interface HubMessage {
    timestamp: number
    messageType: string
    deviceGroup: string
    deviceLabel: string
    id: string
}
interface AccelHubMessage extends HubMessage {
    accelerometerData: AccelerometerData
    locationData: LocationData
}

interface ButtonHubMessage extends HubMessage {
    locationData: LocationData
}

export { AccelHubMessage, ButtonHubMessage }
