import { MongoClient, ObjectId } from 'mongodb'
import { MongoDBConfigs } from '../../app.config.mjs'
import { Logger } from '../../services/logger/logger.mjs'

const client = MongoDBConfigs.ENABLE_MONGO ? new MongoClient(MongoDBConfigs.MONGO_URI, { ...MongoDBConfigs.MONGO_CLIENT_OPTIONS }) : null

const connect = async () => {
  if (MongoDBConfigs.ENABLE_MONGO && client) {
    await client.connect()
  }
}

const close = async () => {
  if (MongoDBConfigs.ENABLE_MONGO && client) {
    await client.close()
  }
}

const collection = (name) => {
  if (MongoDBConfigs.ENABLE_MONGO && name) {
    return client.db(MongoDBConfigs.MONGO_DBNAME).collection(name)
  }
}

const objectId = (id) => {
  if (MongoDBConfigs.ENABLE_MONGO && id) {
    return new ObjectId(id)
  }
}

const bootstrap = async () => {
  if (MongoDBConfigs.ENABLE_MONGO) {
    try {
      await connect()
      Logger.log('info', `MongoDB is ready to use`)
    } catch (error) {
      Logger.log('error', `Can't connect to MongoDB due to: ${JSON.stringify(error)}`)
    }
  }
}

export { bootstrap, close, collection, connect, objectId }
