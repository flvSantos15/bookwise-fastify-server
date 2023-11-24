import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'

const bodySchema = z.object({
  name: z.string(),
  avatar: z.string().nullable(),
  password: z.string()
})

export async function usersRoutes(app: FastifyInstance) {
  app.get('/users', async (req, res) => {
    const users = await prisma.user.findMany()

    return users.map((user) => {
      return {
        name: user.name,
        avatar: user.avatar,
        id: user.id,
        createdAt: user.created_at,
        updatedAt: user.updated_at
      }
    })
  })

  app.post('/users', async (req, res) => {
    const { name, avatar, password } = bodySchema.parse(req.body)

    const user = await prisma.user.create({
      data: {
        name,
        avatar,
        password,
        created_at: new Date(),
        updated_at: new Date()
      }
    })

    return {
      name: user.name,
      avatar: user.avatar,
      createdAt: user.created_at,
      updatedAt: user.updated_at
    }
  })
}
