import { Logger } from '../logger/logger.mjs';
import { PrismaClient } from '@prisma/client';
import { PrismaConfigs } from '../../app.config.mjs';

const prisma = new PrismaClient();

const disconnect = async () => {
  await prisma.$disconnect();
};

const bootstrap = async () => {
  if (PrismaConfigs.ENABLE_PRISMA) {
    Logger.log('info', `Prisma is ready to use`);
  }
};

export { bootstrap, disconnect, prisma };
