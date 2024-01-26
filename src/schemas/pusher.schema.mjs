import { z } from 'zod'

const Message = z.object({
  data: z.any(),
})

export { Message }
