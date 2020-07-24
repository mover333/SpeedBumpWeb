import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { SpeedBumps } from './components/SpeedBumps'
import 'fontsource-roboto'
declare let module: any

ReactDOM.render(<SpeedBumps />, document.getElementById('root'))

if (module.hot) {
    module.hot.accept()
}
