import axios from 'axios'
import { GeneralConfigs, MailConfigs } from '../../app.config.mjs'
import { Logger } from '../../services/logger/logger.mjs'

// Mail Service
const sendMail = async (to, subject, html) => {
  if (MailConfigs.ENABLE_MAIL) {
    await axios.post(
      MailConfigs.MAIL_URL,
      {
        to,
        subject,
        html,
      },
      {
        headers: {
          domain: GeneralConfigs.APP_DOMAIN,
        },
      }
    )
  }
}

const bootstrap = async () => {
  if (MailConfigs.ENABLE_GMAIL) {
    Logger.log('info', `Mail API is ready to use`)
  }
}

export { bootstrap, sendMail }
