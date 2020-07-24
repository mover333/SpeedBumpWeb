import * as React from 'react'

import { AccelerometerData } from '../models/Sensors'
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

interface AccelerometerDisplayProps {
    accData: AccelerometerData
}

const useStyles = makeStyles({
    table: {},
    cell: {
        maxWidth: 10,
    },
})

export const AccelerometerDisplay: React.FunctionComponent<AccelerometerDisplayProps> = (
    props
) => {
    const classes = useStyles()

    return (
        <div>
            <Grid container={true} direction="row" justify="center">
                <h2 style={{ fontFamily: 'Roboto' }}>Accelerometer Data</h2>
            </Grid>
            <TableContainer component={Paper}>
                <Table
                    className={classes.table}
                    aria-label="Acceleration data table"
                >
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
        </div>
    )
}
