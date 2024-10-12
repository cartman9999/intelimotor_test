import puppeteer, { Browser, Page } from 'puppeteer'

export const browserManager = () => {
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
      console.log('Setting page...')
      if (browser) {
        console.log('Inside if')
        const page = await browser.newPage()
        await page.goto(url)
        await page.setViewport({ width, height })
        console.log(
          `Browser page set to ${url} with the following dimensions ${width}x${height}`
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
