import { Request, Response, Router } from 'express'
import { scrapeData } from '@controllers/scraping'

const router = Router()

router.get('/scrape', (req: Request, res: Response) => {
  scrapeData(req, res)
})

export default router
