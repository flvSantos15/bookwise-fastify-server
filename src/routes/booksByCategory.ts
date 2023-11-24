import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'

import { z } from 'zod'

const paramsSchema = z.object({
  bookId: z.string().optional(),
  categoryId: z.string().optional()
})

export async function booksByCategoryRoutes(app: FastifyInstance) {
  app.get('/booksByCategory', async () => {
    const booksByCategory = await prisma.categoryByBook.findMany({})

    return booksByCategory
  })

  app.get('/categoriesByBook/:bookId', async (req) => {
    const { bookId } = paramsSchema.parse(req.params)

    const booksByCategory = await prisma.categoryByBook.findMany({
      where: {
        bookId
      }
    })

    return booksByCategory
  })

  app.get('/booksByCategory/:categoryId', async (req) => {
    const { categoryId } = paramsSchema.parse(req.params)

    const booksByCategory = await prisma.categoryByBook.findMany({
      where: {
        categoryId
      }
    })

    const bookIds = booksByCategory.map((book) => book.bookId)
    let books: any[] = []

    bookIds.map(async (id) => {
      const book = await prisma.book.findUnique({ where: { id } })

      books.push(book)
    })

    const category = await prisma.category.findUnique({
      where: { id: categoryId }
    })

    return booksByCategory.map((res) => {
      return {
        id: res.id,
        category,
        book: books.find((book) => book.id === res.bookId)
      }
    })
  })
}
