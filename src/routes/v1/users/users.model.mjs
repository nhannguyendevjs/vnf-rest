import { prisma } from '../../../services/prisma/prisma.mjs'
import { UserSubmittedSchema } from '../../../schemas/users.schema.mjs'

const getUsers = async (req) => {
  try {
    const queries = req.body.queries
    const result = await prisma.user.findMany(queries)

    return result
  } catch (error) {
    return error
  }
}

const createUser = async (req) => {
  try {
    const user = req.body.user
    const { success, error } = UserSubmittedSchema.safeParse(user)

    if (success) {
      const data = user
      const result = await prisma.user.create({ data })

      return result
    } else {
      return error
    }
  } catch (error) {
    return error
  }
}

const readUser = async (req) => {
  try {
    const where = req.body.where
    const result = await prisma.user.findUnique({ where })

    return result
  } catch (error) {
    return error
  }
}

const updateUser = async (req) => {
  try {
    const user = req.body.user
    const where = req.body.where

    const { success, error } = UserSubmittedSchema.safeParse(user)

    if (success && where) {
      const data = user
      const result = await prisma.user.update({ where, data })

      return result
    } else {
      return error
    }
  } catch (error) {
    return error
  }
}

const deleteUser = async (req) => {
  try {
    const where = req.body.where
    const result = await prisma.user.delete({ where })

    return result
  } catch (error) {
    return error
  }
}

export { createUser, deleteUser, getUsers, readUser, updateUser }
