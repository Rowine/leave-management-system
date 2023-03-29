import chalk from 'chalk'
import dotenv from 'dotenv'
import express from 'express'
import connectDB from './config/db.js'
import { errorHandler, notFound } from './middleware/errorMiddleware.js'
import userRoutes from './routes/userRoutes.js'
// import {} from './routes/leaveRoutes.js'
// import {} from './routes/categoryRoutes.js'

dotenv.config()

connectDB()

const app = express()

app.use(express.json())

app.use('/api/users', userRoutes)
// app.use('/api/leaves', leaveRoutes)
// app.use('/api/categories', categoryRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    chalk.yellow.bold(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
  )
)
