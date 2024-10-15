import { Request, Response } from 'express'
import { browserManager } from '@services/scraping/puppeteerScrapingService'
import {
  authenticateToSite,
  fillOutVehicleForm,
  generateAdvertisement,
} from '@services/scraping/seminuevosScrapingService'
import { createVehicle } from '@services/vehicles'

export const scrapeData = async (req: Request, res: Response) => {
  try {
    const vehicle = createVehicle({ req })
    const { initializeBrowser, setPage, closeBrowser } = browserManager()
    await initializeBrowser()
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
    const advertisement = await generateAdvertisement({ page })
    const imageUrl = `/ads/${advertisement.ssName}`
    await closeBrowser()

    res.json({
      message: `Ad #${advertisement.advertisementId} created succesfully!`,
      advertisementId: advertisement.advertisementId,
      imageUrl,
    })
  } catch (error) {
    console.error('Error while scrapping data:', error)
    res.status(500).json({
      message: `Hubo un error al procesar la solicitud`,
      error: (error as Error).message,
    })
  }
}
