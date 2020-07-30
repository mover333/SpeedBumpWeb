import * as React from 'react'
import * as _ from 'lodash'
import * as hash from 'object-hash'

import { LocationData } from '../models/Sensors'
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'

interface LocationAlerterProps {
    location: LocationData
}

interface LocationAlerterState {
    notificationPermission: NotificationPermission
}

interface LocationLatLon
    extends Omit<LocationData, 'speed' | 'altitude' | 'heading'> {}

export class LocationAlerter extends React.Component<
    LocationAlerterProps,
    LocationAlerterState
> {
    private hashes: string[]
    private valids: LocationLatLon[]
    constructor(props: LocationAlerterProps) {
        super(props)
        this.state = {
            notificationPermission: null,
        }
        this.hashes = []
        this.valids = [{ latitude: 47.62109, longitude: -122.17696 }]
    }

    public render() {
        return <div />
    }

    public async componentDidMount() {
        const roundedValids: LocationLatLon[] = []
        for (const entry of this.valids) {
            roundedValids.push(this.roundLatLon(entry as LocationData))
        }
        this.valids = roundedValids

        try {
            navigator.serviceWorker.register('/service-worker.js')
            if (Notification.permission !== 'granted') {
                await Notification.requestPermission()
                this.setState({
                    notificationPermission: Notification.permission,
                })
            }
        } catch (err) {
            console.log('Error:', err.message)
        }
    }

    public async componentDidUpdate(
        prevProps: LocationAlerterProps,
        prevState: LocationAlerterState
    ) {
        if (!_.isEqual(prevProps.location, this.props.location)) {
            // location has changed
            const rounded = this.roundLatLon(this.props.location)
            if (!this.inHash(rounded, this.hashes)) {
                console.log('not in hash')
                // have not alerted yet
                if (this.inRange(rounded, this.valids)) {
                    console.log('in range')
                    // is in range
                    try {
                        const reg = await navigator.serviceWorker.ready
                        reg.showNotification('Speed Bump!')
                        this.hashes.push(hash(rounded))
                    } catch (err) {
                        console.log('Error: ', err.message)
                    }
                }
            }
        }
    }

    private roundLatLon = (loc: LocationData): LocationLatLon => {
        const newData: LocationLatLon = {
            latitude: _.round(loc.latitude, 4),
            longitude: _.round(loc.longitude, 4),
        }
        return newData
    }

    private inRange = (loc: LocationLatLon, valids: LocationLatLon[]) => {
        console.log('checking range')
        for (const element of valids) {
            console.log(loc, element)
            if (_.isEqual(loc, element)) {
                return true
            }
        }
        return false
    }

    private inHash = (loc: LocationLatLon, hashes: string[]) => {
        const curHash = hash(loc)
        for (const element of hashes) {
            if (curHash === element) return true
        }
        return false
    }
}
