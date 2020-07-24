import * as React from 'react'

import { AccelerometerData, LocationData } from '../models/Sensors'
import {
    TableContainer,
    TableHead,
    Table,
    TableCell,
    TableRow,
    TableBody,
    Paper,
    makeStyles,
    Grid,
} from '@material-ui/core'
import { AccelerometerDisplay } from './AccelerometerDisplay'
import { LocationDisplay } from './LocationDisplay'

interface SensorDisplayProps {
    accData: AccelerometerData
    locationData: LocationData
    paused: boolean
}

const useStyles = makeStyles({
    table: {},
    cell: {
        maxWidth: 10,
    },
})

export const SensorDisplay: React.FunctionComponent<SensorDisplayProps> = (
    props
) => {
    const classes = useStyles()

    let show = (
        <Grid container={true} direction="row" justify="center">
            <h2 style={{ fontFamily: 'Roboto' }}>Paused</h2>
        </Grid>
    )
    if (!props.paused) {
        show = (
            <div>
                <AccelerometerDisplay accData={props.accData} />
                <LocationDisplay locData={props.locationData} />
            </div>
        )
    }

    return show
}
