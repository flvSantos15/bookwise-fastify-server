// import 'dotenv/config'
import fastify from 'fastify'
import cors from '@fastify/cors'
// import jwt from '@fastify/jwt'
// import multipart from '@fastify/multipart'
import { usersRoutes } from './routes/users'
import { categoriesRoutes } from './routes/categories'
import { booksRoutes } from './routes/books'
import { booksByCategoryRoutes } from './routes/booksByCategory'

const app = fastify({
  logger: true
})

app.register(cors, {
  origin: true
})

app.register(usersRoutes)
app.register(categoriesRoutes)
app.register(booksRoutes)
app.register(booksByCategoryRoutes)

app.listen({ port: 3333 }).then(() => {
  console.log('HTTP server running on http://localhost:3333')
})
