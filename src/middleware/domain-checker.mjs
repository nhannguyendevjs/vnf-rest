import { GeneralConfigs } from '../app.config.mjs';
import { Logger } from '../services/logger/logger.mjs';

const domainChecker = (req, res, next) => {
  if (req.headers.domain !== GeneralConfigs.APP_DOMAIN) {
    Logger.log('error', `[${req.ip}] ${req.method} ${req.originalUrl} 401`);
    res.status(401).json(new Error('Invalid Domain'));

    return;
  }

  next();
};

export { domainChecker };
