import express from 'express'
import { resJSON } from '../../../utils/request/request.mjs'
import { deleteUser, getUsers, readUser, updateUser } from './users.model.mjs'
import { ZodError } from 'zod'

const router = express.Router()

/**
 * @openapi
 * /ping:
 *  get:
 *    description: Users API.
 *    tags:
 *      - Users
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
  .get('/search', async (req, res) => {
    const result = await getUsers(req)

    if (result.error instanceof Error) {
      resJSON(req, res, 400, result.error)
    } else {
      resJSON(req, res, 200, result)
    }
  })
  .post('/read', async (req, res) => {
    const result = await readUser(req)

    if (result.error instanceof Error) {
      resJSON(req, res, 400, result.error)
    } else {
      resJSON(req, res, 200, result)
    }
  })
  .patch('/update', async (req, res) => {
    const result = await updateUser(req)

    if (result.error instanceof Error || result.error instanceof ZodError) {
      resJSON(req, res, 400, result.error)
    } else {
      resJSON(req, res, 200, result)
    }
  })
  .delete('/delete', async (req, res) => {
    const result = await deleteUser(req)

    if (result.error instanceof Error) {
      resJSON(req, res, 400, result.error)
    } else {
      resJSON(req, res, 200, result)
    }
  })

export { router as UsersRouter }
