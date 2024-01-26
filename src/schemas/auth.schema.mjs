import zod from 'zod'

const AccountSignUpdSchema = zod.object({
  name: zod.string(),
  email: zod.string().email(),
  phone: zod.string(),
  address: zod.string(),
  password: zod.string(),
  role: zod.enum(['admin', 'user']),
})

const AccountSignInSchema = zod.object({
  username: zod.string(),
  password: zod.string(),
})

export { AccountSignUpdSchema, AccountSignInSchema }
