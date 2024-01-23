import * as AuthSchema from '../../../schemas/auth.schema.mjs'
import { prisma } from '../../../services/prisma/prisma.mjs'
import * as Crypto from '../../../utils/crypto/crypto.mjs'
import * as JWT from '../../../utils/jwt/jwt.mjs'

const generateAccessToken = async (req) => {
  try {
    const result = {
      token: JWT.generateAccessToken(req.body),
    }

    return result
  } catch (error) {
    return error
  }
}

const verifyAccessToken = async (req) => {
  try {
    const token = req.headers.authorization
    const result = await JWT.verifyAccessToken(token)

    return result
  } catch (error) {
    return error
  }
}

const signUpAccount = async (req) => {
  try {
    const account = req.body.account
    const { success, error } = AuthSchema.AccountSignUpdSchema.safeParse(account)

    if (success) {
      const data = {
        username: account.username,
        password: Crypto.encrypt(account.password),
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
      return error
    }
  } catch (error) {
    return error
  }
}

const signInAccount = async (req) => {
  try {
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
        const password = Crypto.decrypt(account.password)

        if (password === signInAccount.password) {
          const data = {
            id: account.user.id,
            username: account.username,
            password: account.password,
          }
          const result = {
            accessToken: JWT.generateAccessToken(data),
            refreshToken: JWT.generateRefreshToken(data),
          }

          return result
        } else {
          return new Error('Invalid username or password')
        }
      } else {
        return new Error('Invalid username or password')
      }
    } else {
      return error
    }
  } catch (error) {
    return error
  }
}

export { generateAccessToken, signInAccount, signUpAccount, verifyAccessToken }
