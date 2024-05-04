import fastify, { FastifyInstance } from 'fastify'
import '@fastify/mongodb'

export default async function app() {
  const server = fastify()

  server.register(require('@fastify/mongodb'), {
    // force to close the mongodb connection when app stopped
    // the default value is false
    forceClose: true,
  
    url: process.env.MONGODB_URL
  })
  
  
  server.get('/ping', async (request, reply) => {
    return 'pong\n'
  })
  
  server.get('/data', async (request, reply) => {
    const mockData = {
      "username": "Alessandro",
      "description": "Tutto il portafoglio è investito in crypto Solana."
    }
  
    // Or this.mongo.client.db('mydb').collection('users')
    // Or .mongo.db.collection('users')
    const users = server.mongo.client.db('mydb').collection('users')
  
    // if the id is an ObjectId format, you need to create a new ObjectId
    // const id = new this.mongo.ObjectId(req.params.id)
    try {
      const user = await users?.findOne()
      return user
    } catch (err) {
      return err
    }
  
    // return mockData
  })

  return server
}