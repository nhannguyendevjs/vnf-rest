export const GeneralConfigs = {
  HOST_ENV: process.env.HOST_ENV,
  HOSTNAME: process.env.HOSTNAME,
  HOST_PORT: process.env.HOST_PORT,
  APP_DOMAIN: process.env.APP_DOMAIN,
  APP_VERSION: process.env.APP_VERSION,
  API_VERSION: process.env.API_VERSION,
  APP_ENV: process.env.APP_ENV,
};

export const BullMQConfigs = {
  ENABLE_BULLMQ: process.env.ENABLE_BULLMQ,
  BULLMQ_ADMIN_PATH: process.env.BULLMQ_ADMIN_PATH,
};

export const ImageKitConfigs = {
  ENABLE_IMAGEKIT: process.env.ENABLE_IMAGEKIT,
  IMAGEKIT_PUBLIC_KEY: process.env.IMAGEKIT_PUBLIC_KEY,
  IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY,
  IMAGEKIT_URL_ENDPOINT: process.env.IMAGEKIT_URL_ENDPOINT,
};

export const JWTConfigs = {
  JWT_ALGORITHM: process.env.JWT_ALGORITHM,
  JWT_ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET,
  JWT_REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET,
  JWT_ACCESS_TOKEN_EXPIRATION_TIME: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
  JWT_REFRESH_TOKEN_EXPIRATION_TIME: process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
};

export const LoggerConfigs = {
  ENABLE_LOGGER_CONSOLE: process.env.ENABLE_LOGGER_CONSOLE,
  ENABLE_LOGGER_FILE: process.env.ENABLE_LOGGER_FILE,
};

export const MailConfigs = {
  ENABLE_MAIL: process.env.ENABLE_MAIL,
  MAIL_URL: process.env.MAIL_URL,
  ENABLE_GMAIL: process.env.ENABLE_GMAIL,
  GMAIL_ACCOUNT: process.env.GMAIL_ACCOUNT,
  GMAIL_PASSWD: process.env.GMAIL_PASSWD,
};

export const MongoDBConfigs = {
  ENABLE_MONGO: process.env.ENABLE_MONGO,
  MONGO_URI: process.env.MONGO_URI,
  MONGO_CLIENT_OPTIONS: {
    // useUnifiedTopology: true,
  },
  MONGO_DBNAME: process.env.APP_DOMAIN,
};

export const OpenWeatherConfigs = {
  OPEN_WEATHER_API_KEY: process.env.OPEN_WEATHER_API_KEY,
  OPEN_WEATHER_CURRENT_WEATHER_API_URL: process.env.OPEN_WEATHER_CURRENT_WEATHER_API_URL,
  OPEN_WEATHER_WEATHER_5_DAYS_API_URL: process.env.OPEN_WEATHER_WEATHER_5_DAYS_API_URL,
  OPEN_WEATHER_DIRECT_GEOCODING_API_URL: process.env.OPEN_WEATHER_DIRECT_GEOCODING_API_URL,
  OPEN_WEATHER_ZIP_POST_GEOCODING_API_URL: process.env.OPEN_WEATHER_ZIP_POST_GEOCODING_API_URL,
};

export const PusherConfigs = {
  ENABLE_PUSHER: process.env.ENABLE_PUSHER,
  PUSHER_APP_ID: process.env.PUSHER_APP_ID,
  PUSHER_KEY: process.env.PUSHER_KEY,
  PUSHER_SECRET: process.env.PUSHER_SECRET,
  PUSHER_CLUSTER: process.env.PUSHER_CLUSTER,
};

export const RequestConfigs = {
  ENABLE_REQUEST: process.env.ENABLE_REQUEST,
  REQUEST_TIMEOUT: process.env.REQUEST_TIMEOUT,
};

export const WebSocketConfigs = {
  ENABLE_WEBSOCKET: process.env.ENABLE_WEBSOCKET,
  WEBSOCKET_URL: process.env.WEBSOCKET_URL,
};

export const PrismaConfigs = {
  ENABLE_PRISMA: process.env.ENABLE_PRISMA,
  PRISMA_DATABASE_URL: process.env.PRISMA_DATABASE_URL,
};

export const bootstrap = async () => {
  console.log(`{"level":"info","message":"App Config is ready to use","timestamp":"${new Date().toISOString()}"}`);
};
