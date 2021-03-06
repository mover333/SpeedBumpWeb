import * as React from 'react'

import { LocationData } from '../models/Sensors'
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
interface LocationDisplayProps {
    locData: LocationData
}

const useStyles = makeStyles({
    table: {},
    cell: {
        maxWidth: 10,
    },
})

export const LocationDisplay: React.FunctionComponent<LocationDisplayProps> = (
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
                <Text variant="large">Location Data</Text>
            </Grid>
            <TableContainer component={Paper}>
                <Table
                    className={classes.table}
                    aria-label="Location data table"
                >
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">Lat</TableCell>
                            <TableCell align="center">Lon</TableCell>
                            <TableCell align="center">Heading</TableCell>
                            <TableCell align="center">Speed</TableCell>
                            <TableCell align="center">Alt</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow key={1}>
                            <TableCell align="center" className={classes.cell}>
                                {props.locData.latitude
                                    ? props.locData.latitude.toFixed(5)
                                    : 'null'}
                            </TableCell>
                            <TableCell align="center" className={classes.cell}>
                                {props.locData.longitude
                                    ? props.locData.longitude.toFixed(5)
                                    : 'null'}
                            </TableCell>
                            <TableCell align="center" className={classes.cell}>
                                {props.locData?.heading
                                    ? props.locData.heading.toFixed(3)
                                    : 'null'}
                            </TableCell>
                            <TableCell align="center" className={classes.cell}>
                                {props.locData?.speed
                                    ? props.locData.speed.toFixed(3)
                                    : 'null'}
                            </TableCell>
                            <TableCell align="center" className={classes.cell}>
                                {props.locData?.altitude
                                    ? props.locData.altitude.toFixed(3)
                                    : 'null'}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}
