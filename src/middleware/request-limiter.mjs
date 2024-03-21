import rateLimit from 'express-rate-limit';

const rateLimitRequest = (time = 1 * 60 * 1000, maxConnections = 1000) => {
  return rateLimit({
    windowMs: time,
    max: maxConnections,
    standardHeaders: true,
    legacyHeaders: false,
  });
};

export { rateLimitRequest };
