import { z } from 'zod'

const MailOptions = z.object({
  from: z.string(),
  to: z.string(),
  subject: z.string(),
  html: z.string(),
})

export { MailOptions }
