import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'
import { userInfo } from 'os'

const paramsSchema = z.object({
  id: z.string().uuid()
})

const bodySchema = z.object({
  name: z.string()
})

export async function categoriesRoutes(app: FastifyInstance) {
  app.get('/categories', async () => {
    const categories = await prisma.category.findMany()

    return categories
  })

  app.get('/categories/:id', async (req, res) => {
    const { id } = paramsSchema.parse(req.params)

    const category = await prisma.category.findUnique({ where: { id } })

    if (!category) {
      return res.status(404).send('Category not found!')
    }

    return category
  })

  app.post('/categories', async (req, res) => {
    const { name } = bodySchema.parse(req.body)

    if (!name) {
      return res.status(403).send('Error user data!')
    }

    await prisma.category.create({
      data: {
        name,
        created_at: new Date(),
        updated_at: new Date()
      }
    })

    return res.status(201).send('Category created successfully!')
  })

  app.patch('/categories/:id', async (req, res) => {
    const { id } = paramsSchema.parse(req.params)
    const { name } = bodySchema.parse(req.body)

    const category = await prisma.category.findUnique({ where: { id } })

    if (!category) {
      return res.status(404).send('Category not found!')
    }

    await prisma.category.update({
      data: {
        name,
        updated_at: new Date()
      },
      where: {
        id
      }
    })

    return res.status(201).send('Category updated successfully!')
  })

  app.delete('/categories/:id', async (req, res) => {
    const { id } = paramsSchema.parse(req.params)

    const category = await prisma.category.findUnique({ where: { id } })

    if (!category) {
      return res.status(404).send('Category not found!')
    }

    await prisma.category.delete({ where: { id } })

    return res.status(201).send('Category deleted successfully!')
  })
}
