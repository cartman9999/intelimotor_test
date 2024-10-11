import express, { Request, Response } from 'express'
import dotenv from 'dotenv'
import scrapingRoutes from './routes/scrapingRoutes'

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use('/api', scrapingRoutes)
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World')
})

app.listen(port, () => {
  console.log(`Intelimotor BE app listening on port ${port}`)
})
