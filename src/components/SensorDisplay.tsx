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
} from '@material-ui/core'

interface SensorDisplayProps {
    accData: AccelerometerData
    locationData: LocationData
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

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">X</TableCell>
                        <TableCell align="center">Y</TableCell>
                        <TableCell align="center">Z</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow key={1}>
                        <TableCell align="center" className={classes.cell}>
                            {props.accData.x.toFixed(3)}
                        </TableCell>
                        <TableCell align="center" className={classes.cell}>
                            {props.accData.y.toFixed(3)}
                        </TableCell>
                        <TableCell align="center" className={classes.cell}>
                            {props.accData.z.toFixed(3)}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}
