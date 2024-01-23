import UAParser from 'ua-parser-js'

const getUserAgent = (req) => {
  const userAgent = new UAParser(req.get('User-Agent'))
  return userAgent
}

export { getUserAgent }
