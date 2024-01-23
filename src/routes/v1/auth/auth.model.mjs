import * as AuthSchema from '../../../schemas/auth.schema.mjs'
import { prisma } from '../../../services/prisma/prisma.mjs'
import * as Crypto from '../../../utils/crypto/crypto.mjs'
import * as JWT from '../../../utils/jwt/jwt.mjs'

const verifyAccessToken = async (req) => {
  try {
    const accessToken = req.headers.authorization
    const result = await JWT.verifyAccessToken(accessToken).data

    return result
  } catch (error) {
    return {
      success: false,
      error,
    }
  }
}

const signUpAccount = async (req) => {
  try {
    const account = req.body.account
    const { success, error } = AuthSchema.AccountSignUpdSchema.safeParse(account)

    if (success) {
      const data = {
        username: account.username,
        password: Crypto.encrypt(account.password).data,
        user: {
          create: {
            name: account.name,
            email: account.email,
            phone: account.phone,
            address: account.address,
          },
        },
      }

      const result = await prisma.account.create({ data })

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

const signInAccount = async (req) => {
  try {
    let hasError = false

    const signInAccount = req.body.account
    const { success, error } = AuthSchema.AccountSignInSchema.safeParse(signInAccount)

    if (success) {
      const account = await prisma.account.findUnique({
        where: {
          username: signInAccount.username,
        },
        include: {
          user: true,
        },
      })

      if (account) {
        const password = Crypto.decrypt(account.password).data

        if (password === signInAccount.password) {
          const data = {
            id: account.user.id,
            username: account.username,
            password: account.password,
          }
          const accessToken = JWT.generateAccessToken(data).data
          const refreshToken = JWT.generateRefreshToken(data).data
          const result = { accessToken, refreshToken }

          return result
        } else {
          hasError = true
        }
      } else {
        hasError = true
      }

      if (hasError) {
        throw new Error('Invalid username or password')
      }
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

const refreshAccessToken = async (req) => {
  try {
    const refreshToken = req.cookies.jwt

    if (refreshToken) {
      const { payload } = await JWT.verifyRefreshToken(refreshToken).data
      const accessToken = JWT.generateAccessToken(payload).data
      const refreshToken = JWT.generateRefreshToken(payload).data
      const result = { accessToken, refreshToken }

      return result
    }
  } catch (error) {
    return {
      success: false,
      error,
    }
  }
}

export { refreshAccessToken, signInAccount, signUpAccount, verifyAccessToken }
