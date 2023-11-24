import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'

const paramsSchema = z.object({
  id: z.string().uuid()
})

const bodySchema = z.object({
  name: z.string().min(1).max(255),
  author: z.string(),
  description: z.string().nullable().optional(),
  picture: z.string().nullable().optional(),
  pages: z.number(),
  categoryIds: z.array(z.string())
})

export async function booksRoutes(app: FastifyInstance) {
  app.get('/books', async () => {
    const books = await prisma.book.findMany({})

    return books
  })

  app.post('/books', async (req, res) => {
    const { name, author, pages, picture, categoryIds } = bodySchema.parse(
      req.body
    )

    const newBook = await prisma.book.create({
      data: {
        name,
        author,
        pages,
        picture,
        created_at: new Date(),
        updated_at: new Date()
      }
    })

    categoryIds.map(async (categoryId) => {
      await prisma.categoryByBook.create({
        data: {
          bookId: newBook.id,
          categoryId
        }
      })
    })

    return res.status(201).send('Book created successfully!')
  })
}
