import * as React from 'react'

import { LocationData } from '../models/Sensors'
import { isIOS13 } from 'react-device-detect'

interface LocationReaderProps {
    updateLocation: (loc: LocationData) => void
}

export class LocationReader extends React.Component<LocationReaderProps, {}> {
    constructor(props: LocationReaderProps) {
        super(props)
    }

    public render() {
        return <div />
    }

    public componentDidMount() {
        try {
            if (isIOS13) {
                navigator.geolocation.watchPosition(
                    this.locationHandler,
                    this.handleError,
                    { enableHighAccuracy: true }
                )
            } else {
                navigator.permissions
                    .query({ name: 'geolocation' })
                    .then((result) => {
                        if (result.state === 'denied') {
                            console.log(
                                'Permission to use accelerometer sensor is denied.'
                            )
                            return
                        }
                        // Use the sensor.
                        navigator.geolocation.watchPosition(
                            this.locationHandler,
                            this.handleError,
                            { enableHighAccuracy: true }
                        )
                    })
            }
        } catch (err) {
            console.log('Error:', err.message)
        }
    }

    private locationHandler = (pos: Position) => {
        const crd = pos.coords
        const locData: LocationData = {
            latitude: crd.latitude,
            longitude: crd.longitude,
            heading: crd.heading,
            speed: crd.speed,
            altitude: crd.altitude,
        }

        this.props.updateLocation(locData)
    }

    private handleError = (err: any) => {
        console.log('Error watching location: ', err)
    }
}
