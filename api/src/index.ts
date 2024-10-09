import express, { Request, Response } from 'express'
import scrapingRoutes from './routes/scrapingRoutes'

const app = express()
const port = 3000

app.use('/api', scrapingRoutes)
app.get('/', (req: Request, res: Response) => {
  res.send('Hwllo World')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
