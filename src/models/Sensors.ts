interface SensorsData {
    accelerometer: AccelerometerData
    location: LocationData
}

interface AccelerometerData {
    x: number
    y: number
    z: number
}

interface LocationData {
    latitude: number
    longitude: number
    heading: number
    speed: number
    altitude: number
}

export { SensorsData, AccelerometerData, LocationData }
