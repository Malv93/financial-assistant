import { FastifyInstance } from 'fastify'

import app from './index'
import addMockedData from './utils/mockData'

// TODO: refactor method to startup and add mocked data in db
app().then(async (server: FastifyInstance) => {
  // Add mock data to mongodb to run locally
  if(process.env.NODE_ENV === 'development') {
    await addMockedData(server)
  }

  server.listen({ port: process.env.PORT || 4000, host: process.env.HOST }, (err, address) => {
    if (err) {
      console.error(err)
      process.exit(1)
    }
    console.log(`Server listening at ${address}`)
  })
}
)

