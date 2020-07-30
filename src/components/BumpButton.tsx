import * as React from 'react'

import {
    Button,
    makeStyles,
    Theme,
    createStyles,
    ThemeProvider,
    Grid,
} from '@material-ui/core'
import { PrimaryButton, Text } from '@fluentui/react'

interface BumpButtonProps {
    buttonPressed: () => void
}

export const BumpButton: React.FunctionComponent<BumpButtonProps> = (props) => {
    const [count, setCount] = React.useState(0)
    return (
        <Grid
            container={true}
            direction="column"
            justify="center"
            alignItems="center"
            alignContent="center"
        >
            <PrimaryButton
                style={{ minWidth: '200px', minHeight: '100px' }}
                onClick={() => {
                    setCount(count + 1)
                    props.buttonPressed()
                }}
            >
                Speed Bump
            </PrimaryButton>
            <Text style={{ margin: '20px' }}>Press Count: {count}</Text>
        </Grid>
    )
}
