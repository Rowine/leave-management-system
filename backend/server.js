import chalk from 'chalk'
import dotenv from 'dotenv'
import express from 'express'

dotenv.config()

const app = express()

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    chalk.yellow.bold(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
  )
)
