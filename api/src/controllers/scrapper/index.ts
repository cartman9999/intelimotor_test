import { Request, Response } from 'express'
import puppeteer, { Browser, Page } from 'puppeteer'
import path from 'path'

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

const authenticateToSite = async ({ page }: { page: Page }) => {
  const loginBtn = await page.locator('a.login-btn')

  await Promise.all([
    loginBtn.click(),
    page.waitForNavigation({ waitUntil: 'networkidle0' }),
  ])

  await page.screenshot({
    path: `ss/login.png`,
  })

  const emailInput = await page.locator('#email')
  await emailInput.fill(`${process.env.SEMINUEVOS_USER}`)
  const passwordInput = await page.locator('#password')
  await passwordInput.fill(`${process.env.SEMINUEVOS_PASSWORD}`)
  const submitBtn = await page.locator('button[type="submit"]')

  await page.screenshot({
    path: `ss/loginForm.png`,
  })

  await Promise.all([
    await submitBtn.click(),
    page.waitForNavigation({ waitUntil: 'networkidle0' }),
  ])

  await page.screenshot({
    path: `ss/home.png`,
  })

  const vendeTuVehiculoBtn = await page.locator('a.btn-primary')

  await Promise.all([
    await vendeTuVehiculoBtn.click(),
    page.waitForNavigation({ waitUntil: 'networkidle0' }),
  ])

  await page.screenshot({
    path: `ss/vende_tu_vehiculo.png`,
  })
}

const browserManager = () => {
  let browser: Browser | null = null

  return {
    initializeBrowser: async (): Promise<Browser> => {
      if (!browser) {
        browser = await puppeteer.launch({ headless: 'shell' })
        console.log('Browser initialized')
      }
      return browser
    },
    setPage: async ({
      url,
      width = 1080,
      height = 1024,
    }: {
      url: string
      width: number
      height: number
    }): Promise<Page> => {
      if (browser) {
        const page = await browser.newPage()
        await page.goto(url)
        await page.setViewport({ width, height })
        console.log(
          `Browser page set to ${url} with the following dimentions ${width}x${height}`
        )
        return page
      } else {
        throw new Error(
          'Browser is not set. Cannot set a page on an uninitialized browser.'
        )
      }
    },
    closeBrowser: async (): Promise<void> => {
      if (browser) {
        await browser.close()
        console.log('Browser closed')
        browser = null
      } else {
        throw new Error(
          'Browser is not initialized. Cannot close an uninitialized browser'
        )
      }
    },
  }
}

export const scrapeData = async (req: Request, res: Response) => {
  const { initializeBrowser, setPage, closeBrowser } = browserManager()
  const browser = await initializeBrowser()
  const page = await setPage({
    url: `https://www.seminuevos.com`,
    width: 2000,
    height: 1000,
  })
  await page.screenshot({
    path: `ss/seminuevos.png`,
  })

  await authenticateToSite({ page })
  await closeBrowser()

  res.send('Inside scrape controller')
}
