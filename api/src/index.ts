import express from 'express'
import dotenv from 'dotenv'
import scrapingRoutes from './routes/scrapingRoutes'
import path from 'path'
import cors from 'cors'

dotenv.config()
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(cors())
app.use('/api', scrapingRoutes)
app.use(
  '/ads',
  express.static(path.join(__dirname, '../generated/screenshots'))
)

app.listen(port, () => {
  console.log(`Intelimotor BE app listening on port ${port}`)
})
