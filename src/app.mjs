import compression from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import multer from 'multer'
import path from 'node:path'
import { Worker } from 'worker_threads'
import { RequestConfigs } from './app.config.mjs'
import { cacheControlNoStore } from './middleware/cache-control.mjs'
import { V1Router } from './routes/v1/v1.mjs'

// Bootstrap modules and services
import * as AppConfigModule from './app.config.mjs'
import * as BullMQService from './services/bullmq/bullmq.mjs'
import * as ImageKitMService from './services/imagekit/imagekit.mjs'
import * as LoggerService from './services/logger/logger.mjs'
import * as MailService from './services/mail/mail.mjs'
import * as MongoDBService from './services/mongodb/mongodb.mjs'
import * as PrismaService from './services/prisma/prisma.mjs'
import * as PusherService from './services/pusher/pusher.mjs'
import * as SignalService from './services/signal/signal.mjs'

await AppConfigModule.bootstrap()
await LoggerService.bootstrap()
await MongoDBService.bootstrap()
await PrismaService.bootstrap();
await BullMQService.bootstrap()
await ImageKitMService.bootstrap()
await PusherService.bootstrap()
await MailService.bootstrap()
await SignalService.bootstrap()

const __dirname = path.resolve()

const app = express()

app.use(cors())
app.use(compression())
app.use(cookieParser())
app.use(multer().any())
app.use(express.json({ limit: RequestConfigs.MAX_REQUEST_BODY_SIZE }))
app.use(express.raw({ limit: RequestConfigs.MAX_REQUEST_BODY_SIZE }))
app.use(express.text({ limit: RequestConfigs.MAX_REQUEST_BODY_SIZE }))
app.use(express.urlencoded({ limit: RequestConfigs.MAX_REQUEST_BODY_SIZE, extended: true }))
app.use(express.static(__dirname + '/public'))
app.use(cacheControlNoStore)

app.use('/api/v1', V1Router)

app.use('/', (req, res) => {
  LoggerService.Logger.log('error', `[${req.ip}] ${req.method} ${req.originalUrl} 404`)
  res.status(404).json({ message: 'Not found' })
})

// Use helmet middleware after api-docs route
// Issue: https://github.com/scottie1984/swagger-ui-express/issues/212
app.use(helmet())

let appWorker

appWorker = new Worker(__dirname + '/utils/worker-threads/app.worker.mjs', { workerData: 'ping' })
appWorker.on('message', (res) => {
  LoggerService.Logger.log('info', res.value)
})

export default app
