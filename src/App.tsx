import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { initializeIcons } from '@fluentui/react/lib/Icons'

import { SpeedBumps } from './components/SpeedBumps'
declare let module: any

initializeIcons()

ReactDOM.render(<SpeedBumps />, document.getElementById('root'))

if (module.hot) {
    module.hot.accept()
}
