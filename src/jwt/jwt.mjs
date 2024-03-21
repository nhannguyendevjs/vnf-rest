import jwt from 'jsonwebtoken';
import { DateTime } from 'luxon';
import { JWTConfigs } from '../app.config.mjs';

const generateAccessToken = (payload) => {
  try {
    const result = jwt.sign(payload, JWTConfigs.JWT_ACCESS_TOKEN_SECRET, { algorithm: JWTConfigs.JWT_ALGORITHM, expiresIn: JWTConfigs.JWT_ACCESS_TOKEN_EXPIRATION_TIME });

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};

const verifyAccessToken = async (token) => {
  try {
    const payload = jwt.verify(token, JWTConfigs.JWT_ACCESS_TOKEN_SECRET, { algorithm: JWTConfigs.JWT_ALGORITHM });
    const expireIn = DateTime.fromMillis(payload.exp * 1000);
    const today = DateTime.now();
    const result = {
      valid: today < expireIn,
      payload,
    };

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};

const decryptAccessToken = async (token) => {
  try {
    const result = jwt.verify(token, JWTConfigs.JWT_ACCESS_TOKEN_SECRET, { algorithm: JWTConfigs.JWT_ALGORITHM });

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};

const generateRefreshToken = (payload) => {
  try {
    const result = jwt.sign(payload, JWTConfigs.JWT_REFRESH_TOKEN_SECRET, { algorithm: JWTConfigs.JWT_ALGORITHM, expiresIn: JWTConfigs.JWT_REFRESH_TOKEN_EXPIRATION_TIME });

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};

const verifyRefreshToken = async (token) => {
  try {
    const payload = jwt.verify(token, JWTConfigs.JWT_REFRESH_TOKEN_SECRET, { algorithm: JWTConfigs.JWT_ALGORITHM });
    const expireIn = DateTime.fromMillis(payload.exp * 1000);
    const today = DateTime.now();
    const result = {
      valid: today < expireIn,
      payload,
    };

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};

const decryptRefreshToken = async (token) => {
  try {
    const result = jwt.verify(token, JWTConfigs.JWT_REFRESH_TOKEN_SECRET, { algorithm: JWTConfigs.JWT_ALGORITHM });

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      error,
    };
  }
};

export { decryptAccessToken, decryptRefreshToken, generateAccessToken, generateRefreshToken, verifyAccessToken, verifyRefreshToken };
