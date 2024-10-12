import { Request, Response } from 'express'
import puppeteer, { Browser, Page } from 'puppeteer'
import path from 'path'
import { browserManager } from '@services/scraping/puppeteerScrapingService'
import {
  authenticateToSite,
  fillOutVehicleForm,
} from '@services/scraping/seminuevosScrapingService'
import { createVehicle } from '@services/vehicles'

const demoPuppeteer = async () => {
  // Launch the browser and open a new blank page
  //   const browser = await puppeteer.launch()
  const browser = await puppeteer.launch({ headless: 'shell' })
  const page = await browser.newPage()

  // Navigate the page to a URL.
  await page.goto('https://developer.chrome.com/')

  // Set screen size.
  await page.setViewport({ width: 1080, height: 1024 })

  // Type into search box.
  await page.locator('.devsite-search-field').fill('automate beyond recorder')

  // Wait and click on first result.
  await page.locator('.devsite-result-item-link').click()

  // Locate the full title with a unique string.
  const textSelector = await page
    .locator('text/Customize and automate')
    .waitHandle()
  const fullTitle = await textSelector?.evaluate(el => el.textContent)

  // Print the full title.
  console.log('The title of this blog post is "%s".', fullTitle)

  const adScreenshot = await page.screenshot({
    path: 'hn.png',
  })

  await browser.close()
}

const demoScreenshot = async () => {
  // Create a browser instance
  const browser = await puppeteer.launch()

  // Create a new page
  const page = await browser.newPage()

  // Set viewport width and height
  await page.setViewport({ width: 1280, height: 720 })

  const website_url =
    'https://www.bannerbear.com/blog/how-to-convert-html-into-pdf-with-node-js-and-puppeteer/'

  // Open URL in current page
  await page.goto(website_url, { waitUntil: 'networkidle0' })

  const filePath = path.resolve(
    __dirname,
    '..',
    '..',
    '..',
    'generated',
    'screenshots',
    'firstScreenshot.png'
  )
  await page.screenshot({
    path: filePath,
  })

  //   const filePath = path.resolve('@generated/screenshots', 'screenshot.png')
  //   await page.screenshot({ path: filePath })

  console.log('Finaliza')
  await browser.close()
}

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
  await closeBrowser()

  res.send('Inside scrape controller')
}
