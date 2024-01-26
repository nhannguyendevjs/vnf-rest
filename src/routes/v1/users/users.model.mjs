import { prisma } from '../../../services/prisma/prisma.mjs'
import { UserUpdatedSchema } from '../../../schemas/users.schema.mjs'

const getUsers = async (req) => {
  try {
    const queries = req.body.queries
    const result = await prisma.user.findMany(queries)

    return result
  } catch (error) {
    return {
      success: false,
      error,
    }
  }
}

const readUser = async (req) => {
  try {
    const where = req.body.where
    const result = await prisma.user.findUnique({ where })

    return result
  } catch (error) {
    return {
      success: false,
      error,
    }
  }
}

const updateUser = async (req) => {
  try {
    const { where, data } = req.body

    const { success, error } = UserUpdatedSchema.safeParse(data)

    if (success && where) {
      const result = await prisma.user.update({ where, data })

      return result
    } else {
      throw error
    }
  } catch (error) {
    return {
      success: false,
      error,
    }
  }
}

const deleteUser = async (req) => {
  try {
    const where = req.body.where
    const result = await prisma.user.delete({ where })

    return result
  } catch (error) {
    return {
      success: false,
      error,
    }
  }
}

export { deleteUser, getUsers, readUser, updateUser }
