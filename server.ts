import * as dotenv from 'dotenv'
dotenv.config()

import * as path from 'path'
import * as express from 'express'
import * as webpack from 'webpack'
import * as webpack_dev_middleware from 'webpack-dev-middleware'
import * as webpack_hot_middleware from 'webpack-hot-middleware'
import config from './webpack.config'

import { Message } from 'azure-iot-common'
import { Client } from 'azure-iot-device'
import { Mqtt as Protocol } from 'azure-iot-device-mqtt'

const deviceConnectionStrings: Record<string, string> = {
    testDevice: '<Redacted>',
    Name1One: '<Redacted>',
    Name1Two: '<Redacted>',
    Name1Three: '<Redacted>',
    Name2One: '<Redacted>',
    Name2Two: '<Redacted>',
    Name2Three: '<Redacted>',
    Name3One: '<Redacted>',
    Name3Two: '<Redacted>',
    Name3Three: '<Redacted>',
    Name4One: '<Redacted>',
    Name4Two: '<Redacted>',
    Name4Three: '<Redacted>',
}
const clients: Record<string, Client> = {}

for (const [key, value] of Object.entries(deviceConnectionStrings)) {
    clients[key] = Client.fromConnectionString(value, Protocol)
}

const app = express()
const port = process.env.PORT || 3000
const dev = process.env.PROD === 'false'

app.use(express.json())

app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})

app.get('/', (req: express.Request, res: express.Response) => {
    res.sendFile(path.resolve(__dirname, 'frontEnd', 'index.html'))
})

app.get('/deviceLabels', (req: express.Request, res: express.Response) => {
    const deviceLabels = Object.keys(clients)
    res.json(deviceLabels)
})

app.post('/giveMeData', (req: express.Request, res: express.Response) => {
    const body = req.body
    const jsonBody = JSON.stringify(body)

    const deviceLabel = body.deviceLabel
    const validDeviceLabels = Object.keys(clients)
    if (!deviceLabel || !validDeviceLabels.includes(deviceLabel)) {
        console.log('Bad device label received')
        res.sendStatus(400)
    } else {
        const client = clients[deviceLabel]
        client.open(() => {
            client.on('error', (err: any) => {
                console.error(err.toString())
                res.sendStatus(500)
            })

            client.on('disconnect', () => {
                console.error('Client was disconnected')
                res.sendStatus(500)
            })

            client.sendEvent(new Message(jsonBody), (err: any) => {
                if (err) {
                    console.error(err.toString())
                } else {
                    // console.log('Sent: ', jsonBody)
                    res.sendStatus(200)
                }
            })
        })
    }
})

if (dev) {
    const compiler = webpack(config)
    app.use(
        webpack_dev_middleware(compiler, {
            publicPath: config.output.publicPath,
            stats: { colors: true },
        })
    )

    app.use(webpack_hot_middleware(compiler))
}

app.use(express.static(path.resolve(__dirname, 'frontEnd')))
