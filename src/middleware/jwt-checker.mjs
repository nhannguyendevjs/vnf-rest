import jwt from 'jsonwebtoken';
import { DateTime } from 'luxon';
import { JWTConfigs } from '../app.config.mjs';
import { Logger } from '../services/logger/logger.mjs';
import { prisma } from '../services/prisma/prisma.mjs';

const jwtChecker = async (req, res, next) => {
  try {
    const headers = req.headers;
    const token = headers.authorization;
    if (token) {
      const payload = jwt.verify(token, JWTConfigs.JWT_SECRET, { algorithm: JWTConfigs.JWT_ALGORITHM });
      const phone = payload.phone;
      const expireIn = DateTime.fromMillis(payload.exp * 1000);
      const user = await prisma.user.findUnique({ where: { phone: phone } });
      const today = DateTime.now();

      // Check if token is expired
      if (today > expireIn) {
        Logger.log('error', `[${req.ip}] ${req.method} ${req.originalUrl} 401`);
        res.status(401).json(new Error('Expired Token'));
      }

      // Check if user exists
      if (user.phone.toString() !== phone) {
        Logger.log('error', `[${req.ip}] ${req.method} ${req.originalUrl} 401`);
        res.status(401).json(new Error('Invalid Token'));
      }

      // Token is valid
      next();
    } else {
      // Token is empty
      Logger.log('error', `[${req.ip}] ${req.method} ${req.originalUrl} 401`);
      res.status(401).json(new Error('Empty Token'));
    }
  } catch (_) {
    Logger.log('error', `[${req.ip}] ${req.method} ${req.originalUrl} 401`);
    res.status(401).json(new Error('Unknown Error'));
  }
};

export { jwtChecker };
