import { Logger } from './services/logger/logger.mjs';
import { MongoDBConfigs, PrismaConfigs } from './app.config.mjs';
import * as MongoDB from './services/mongodb/mongodb.mjs';
import * as Prisma from './services/prisma/prisma.mjs';

const cleanUp = async (eventType, eventDetails) => {
  Logger.log('info', `Server is stop from event::${eventType}`, eventDetails);

  if (MongoDBConfigs.ENABLE_MONGO) {
    await MongoDB.close();
    Logger.log('info', `MongoDB connection closed`);
  }

  if (PrismaConfigs.ENABLE_PRISMA) {
    await Prisma.disconnect();
    Logger.log('info', `Prisma connection closed`);
  }

  process.exit();
};

export { cleanUp };
