import express from 'express';
import { ZodError } from 'zod';
import { resJSON } from '../../../utils/request/request.mjs';
import { refreshAccessToken, signInAccount, signUpAccount, verifyAccessToken } from './auth.model.mjs';

const router = express.Router();

/**
 * @openapi
 * /ping:
 *  get:
 *    description: Auth API.
 *    tags:
 *      - Auth
 *    responses:
 *      200:
 *        description: Success.
 *      400:
 *        description: Bad request.
 *      404:
 *        description: Not found.
 *      500:
 *        description: Internal Server Error.
 */
router
  .get('/me', async (req, res) => {
    const result = await verifyAccessToken(req);

    if (result.error instanceof Error) {
      resJSON(req, res, 401, result.error);
    } else {
      resJSON(req, res, 200, result);
    }
  })
  .post('/sign-up', async (req, res) => {
    const result = await signUpAccount(req);

    if (result.error instanceof Error) {
      resJSON(req, res, 400, result.error);
    } else {
      resJSON(req, res, 200, result);
    }
  })
  .post('/sign-in', async (req, res) => {
    const result = await signInAccount(req);

    res.cookie('jwt', result.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 365 * 24 * 60 * 60 * 1000,
    });

    if (result.error instanceof Error) {
      resJSON(req, res, 401, result.error);
    } else {
      resJSON(req, res, 200, { accessToken: result.accessToken, user: result.user });
    }
  })
  .post('/refresh', async (req, res) => {
    const result = await refreshAccessToken(req);

    res.cookie('jwt', result.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      maxAge: 365 * 24 * 60 * 60 * 1000,
    });

    if (result.error instanceof Error || result.error instanceof ZodError) {
      resJSON(req, res, 406, result.error);
    } else {
      resJSON(req, res, 200, { accessToken: result.accessToken });
    }
  });

export { router as AuthRouter };
