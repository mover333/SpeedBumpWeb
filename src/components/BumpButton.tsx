import * as React from 'react'

import {
    Button,
    makeStyles,
    Theme,
    createStyles,
    ThemeProvider,
} from '@material-ui/core'

interface BumpButtonProps {
    buttonPressed: () => void
    paused: boolean
}

export const BumpButton: React.FunctionComponent<BumpButtonProps> = (props) => {
    const classes = useStyles()
    let show = (
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

    if (props.paused) {
        show = <div />
    }
    return show
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        main: {
            padding: theme.spacing(6),
        },
    })
)
