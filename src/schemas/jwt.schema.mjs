import zod from 'zod';

const JwtSignPayloadSchema = zod.object({
  id: zod.string(),
  username: zod.string(),
  password: zod.any(),
});

export { JwtSignPayloadSchema };
