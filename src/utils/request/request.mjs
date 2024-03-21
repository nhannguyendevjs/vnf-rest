import { Logger } from '../../services/logger/logger.mjs';

/**
 * @param {*} req
 * @param {number} code
 */
const showLog = (req, code) => {
  if (code < 400) {
    Logger.log('info', `[${req.ip}] ${req.method} ${req.originalUrl} ${code}`);
  } else {
    Logger.log('error', `[${req.ip}] ${req.method} ${req.originalUrl} ${code}`);
  }
};

/**
 * @description
 * - Informational responses (100 – 199)
 * - Successful responses (200 – 299)
 * - Redirection messages (300 – 399)
 * - Client error responses (400 – 499)
 * - Server error responses (500 – 599)
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
 */
const buildResSuccess = (code) => {
  return code < 400;
};

const buildResKey = (data) => {
  return data instanceof Error ? 'error' : 'data';
};

const buildResData = (code, data) => {
  return data instanceof Error ? { code, message: data.message } : data;
};

const resJSON = (req, res, code, data) => {
  showLog(req, code);

  res.status(code).json({
    success: buildResSuccess(code),
    [buildResKey(data)]: buildResData(code, data),
  });
};

const resSend = (req, res, code, data) => {
  showLog(req, code);

  res.status(code).send(data);
};

export { resJSON, resSend };
