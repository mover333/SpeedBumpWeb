import * as React from 'react'

import {
    Button,
    makeStyles,
    Theme,
    createStyles,
    ThemeProvider,
    Grid,
} from '@material-ui/core'

interface BumpButtonProps {
    buttonPressed: () => void
    paused: boolean
}

export const BumpButton: React.FunctionComponent<BumpButtonProps> = (props) => {
    const classes = useStyles()
    const [count, setCount] = React.useState(0)
    const show = (
        <Grid
            container={true}
            direction="column"
            justify="center"
            alignItems="center"
            alignContent="center"
        >
            <a
                onClick={() => {
                    setCount(count + 1)
                    props.buttonPressed()
                }}
            >
                <Button
                    variant="contained"
                    size="large"
                    className={classes.main}
                    color="primary"
                >
                    Speed Bump
                </Button>
            </a>
            <p style={{ fontFamily: 'Roboto' }}>Press Count: {count}</p>
        </Grid>
    )

    return show
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        main: {
            padding: theme.spacing(6),
        },
    })
)
