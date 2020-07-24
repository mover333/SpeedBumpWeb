import * as React from 'react'

import {
    Button,
    makeStyles,
    createMuiTheme,
    Theme,
    createStyles,
    ThemeProvider,
} from '@material-ui/core'

interface BumpButtonProps {
    buttonPressed: () => void
}

export const BumpButton: React.FunctionComponent<BumpButtonProps> = (props) => {
    const classes = useStyles()
    return (
        <a onClick={props.buttonPressed}>
            <ThemeProvider theme={theme}>
                <Button
                    variant="contained"
                    size="large"
                    className={classes.main}
                    color="primary"
                >
                    Speed Bump
                </Button>
            </ThemeProvider>
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
        primary: { main: '#2196f3' },
    },
})
