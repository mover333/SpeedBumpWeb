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
import { Text } from '@fluentui/react'

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
            <Grid
                container={true}
                direction="row"
                justify="center"
                style={{ margin: '10px' }}
            >
                <Text variant="large">Accelerometer Data</Text>
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
                                {props.accData.x !== null
                                    ? props.accData.x.toFixed(3)
                                    : 'null'}
                            </TableCell>
                            <TableCell align="center" className={classes.cell}>
                                {props.accData.y !== null
                                    ? props.accData.y.toFixed(3)
                                    : 'null'}
                            </TableCell>
                            <TableCell align="center" className={classes.cell}>
                                {props.accData.z !== null
                                    ? props.accData.z.toFixed(3)
                                    : 'null'}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
