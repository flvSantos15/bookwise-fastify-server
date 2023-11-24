import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'

const paramsSchema = z.object({
  id: z.string().uuid()
})

const bodySchema = z.object({
  name: z.string().optional(),
  avatar: z.string().nullable().optional(),
  password: z.string().optional()
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

  app.get('/users/:id', async (req, res) => {
    const { id } = paramsSchema.parse(req.params)

    const user = await prisma.user.findUnique({ where: { id } })

    if (!user) {
      return res.status(404).send('User not found!')
    }

    return {
      id: user.id,
      name: user.name,
      avatar: user.avatar,
      createdAt: user.created_at,
      updatedAt: user.updated_at
    }
  })

  app.post('/users', async (req) => {
    const { name, avatar, password } = bodySchema.parse(req.body)

    if (!name || !password) {
      throw new Error('Invalid user data!')
    }

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

  app.patch('/users/:id', async (req, res) => {
    const { id: userId } = paramsSchema.parse(req.params)
    const { avatar, name, password } = bodySchema.parse(req.body)

    const user = await prisma.user.findUnique({ where: { id: userId } })

    if (!user) {
      return res.status(404).send('User not found!')
    }

    await prisma.user.update({
      where: { id: userId },
      data: {
        avatar,
        name,
        password
      }
    })

    return {
      id: user.id,
      name: user.name,
      avatar: user.avatar,
      createdAt: user.created_at,
      updatedAt: user.updated_at
    }
  })

  app.delete('/users/:id', async (req, res) => {
    const { id } = paramsSchema.parse(req.params)

    const user = await prisma.user.findUnique({ where: { id } })

    if (!user) {
      return res.status(404).send('User not found!')
    }

    await prisma.user.delete({ where: { id } })

    return {
      id: user.id,
      name: user.name,
      avatar: user.avatar,
      createdAt: user.created_at,
      updatedAt: user.updated_at
    }
  })
}
