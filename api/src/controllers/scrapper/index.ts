import { Request, Response } from 'express'
import puppeteer from 'puppeteer'
import path from 'path'

export const scrapeData = async (req: Request, res: Response) => {
  res.send('Inside scrape controller')
}
