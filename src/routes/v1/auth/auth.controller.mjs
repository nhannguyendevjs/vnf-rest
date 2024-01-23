import express from 'express'
import { resJSON } from '../../../utils/request/request.mjs'
import { generateAccessToken, verifyAccessToken, signInAccount, signUpAccount } from './auth.model.mjs'

const router = express.Router()

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
  .post('/token', async (req, res) => {
    const result = await generateAccessToken(req)

    if (result instanceof Error) {
      resJSON(req, res, 400, result)
    } else {
      resJSON(req, res, 200, result)
    }
  })
  .get('/verify', async (req, res) => {
    const result = await verifyAccessToken(req)

    if (result instanceof Error) {
      resJSON(req, res, 400, result)
    } else {
      resJSON(req, res, 200, result)
    }
  })
  .post('/sign-up', async (req, res) => {
    const result = await signUpAccount(req)

    if (result instanceof Error) {
      resJSON(req, res, 400, result)
    } else {
      resJSON(req, res, 200, result)
    }
  })
  .post('/sign-in', async (req, res) => {
    const result = await signInAccount(req)

    if (result instanceof Error) {
      resJSON(req, res, 401, result)
    } else {
      resJSON(req, res, 200, result)
    }
  })

export { router as AuthRouter }
