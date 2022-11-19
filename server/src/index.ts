import logger from './logger'
import app from './app'
import db from './db'

const SERVER_PORT = 8000

const main = async () => {
  await app.listen(SERVER_PORT)
}

main()
  .then(async () => {
    logger.debug(`Server is up at http://localhost:${SERVER_PORT}`)
    db.$disconnect()
  })
  .catch(() => {
    db.$disconnect()
  })
