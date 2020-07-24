import * as React from 'react'

import {
    Button,
    makeStyles,
    createMuiTheme,
    Theme,
    createStyles,
} from '@material-ui/core'
import { blue } from '@material-ui/core/colors'

interface BumpButtonProps {
    buttonPressed: () => void
}

export const BumpButton: React.FunctionComponent<BumpButtonProps> = (props) => {
    const classes = useStyles()
    return (
        <a onClick={props.buttonPressed}>
            <Button
                variant="contained"
                size="large"
                className={classes.main}
                color="primary"
            >
                Speed Bump
            </Button>
        </a>
    )
}

const useStyles = makeStyles((themee: Theme) =>
    createStyles({
        main: {
            padding: themee.spacing(6),
        },
    })
)

const theme = createMuiTheme({
    palette: {
        primary: blue,
    },
})
