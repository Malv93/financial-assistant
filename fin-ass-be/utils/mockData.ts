import { FastifyInstance } from "fastify"

export default async function addMockedData(server: FastifyInstance) {
  try {
    const users = server.mongo.client.db('mydb').collection('users')
    const mockUsers = [
      {
        "username": "Alessandro",
        "description": "Tutto il portafoglio è investito in crypto Solana."
      },
      {
        "username": "Piero",
        "description": "Tutto il portafoglio è investito in titoli di stato."
      },
      {
        "username": "Marco",
        "description": "La maggior parte del portafoglio è investito in ETF indicizzati, ben diversificati e con bassi costi di gestione."
      },
    ]
    await users?.insertMany(mockUsers)
  } catch (err) {
    console.error(err, 'Failed to add mocked data to mongodb database.')
    throw err
  }
}
