import zod from 'zod'

const UserSchema = zod.object({
  id: zod.string(),
  name: zod.string(),
  email: zod.string().email(),
  phone: zod.string(),
  address: zod.string(),
})

const UserSubmittedSchema = zod.object({
  name: zod.string(),
  email: zod.string().email(),
  phone: zod.string(),
  address: zod.string(),
})

export { UserSchema, UserSubmittedSchema }

