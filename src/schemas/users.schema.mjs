import zod from 'zod';

const UserSchema = zod.object({
  id: zod.string(),
  name: zod.string(),
  email: zod.string().email(),
  phone: zod.string(),
  address: zod.string(),
});

const UserUpdatedSchema = zod.object({
  name: zod.string(),
  email: zod.string().email(),
  phone: zod.string(),
  address: zod.string(),
});

export { UserSchema, UserUpdatedSchema };
