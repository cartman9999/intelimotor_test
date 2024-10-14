import { Request, Response } from 'express'
import puppeteer, { Browser, Page } from 'puppeteer'
import path from 'path'
import { browserManager } from '@services/scraping/puppeteerScrapingService'
import {
  authenticateToSite,
  fillOutVehicleForm,
  generateAdvertisement,
} from '@services/scraping/seminuevosScrapingService'
import { createVehicle } from '@services/vehicles'

export const scrapeData = async (req: Request, res: Response) => {
  const vehicle = createVehicle({ req })
  const { initializeBrowser, setPage, closeBrowser } = browserManager()
  const browser = await initializeBrowser()
  const page = await setPage({
    url: `https://www.seminuevos.com`,
    width: 2000,
    height: 1000,
  })
  await page.screenshot({
    path: `ss/00_seminuevos.png`,
  })

  await authenticateToSite({ page })
  await fillOutVehicleForm({ page, vehicle })
  const advertisment = await generateAdvertisement({ page })
  const imageUrl = `/ads/${advertisment.ssName}`
  await closeBrowser()

  res.json({
    message: `Ad #${advertisment.advertisementId} created succesfully!`,
    imageUrl,
  })
}
