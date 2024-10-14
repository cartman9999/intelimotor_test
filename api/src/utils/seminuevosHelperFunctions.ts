import { Page } from 'puppeteer'
import { wait } from '@utils/helperFunctions'
import path from 'path'
import { Ad, Dropdown } from '@customTypes/index'

export const waitForResponse = async ({
  page,
  endpoint,
}: {
  page: Page
  endpoint: string
}) => {
  try {
    console.log(`Waiting for ${endpoint} to be completed...`)
    await page.waitForResponse(
      response => response.url().includes(endpoint) && response.status() === 200
    )
    console.log(`Operation ${endpoint} completed succesfully`)
  } catch (error) {
    throw new Error(`Operation ${endpoint} was not completed. Error: ${error}}`)
  }
}

export const selectVehicleDropdownValues = async ({
  page,
  dropdowns,
}: {
  page: Page
  dropdowns: Array<Dropdown>
}) => {
  for (const dropdown of dropdowns) {
    const { selector, value, endpoint, timeout } = dropdown

    console.log(`Selecting dropdown: ${selector}, value: ${value}`)

    await page.waitForSelector(`a[data-activates="${selector}"]`)
    await page.click(`a[data-activates="${selector}"]`)

    await page.waitForSelector(`#${selector} ul li[data-content="${value}"]`)
    await page.click(`#${selector} ul li[data-content="${value}"] a`)

    if (endpoint) {
      await waitForResponse({ page, endpoint })
    }

    if (timeout) {
      await wait(timeout)
    }
  }
}

export const fillVehicleInput = async ({
  page,
  selector,
  value,
}: {
  page: Page
  selector: string
  value: string
}) => {
  console.log('Filling Text input: ', selector)
  await page.focus(selector)
  await page.keyboard.type(value)
}

export const takeAdScreenShot = async ({
  page,
  url,
}: {
  page: Page
  url: string
}): Promise<Ad> => {
  const advertisementUrl = url.replace('/plans', '')
  const advertisementId =
    advertisementUrl.split('/')[advertisementUrl.split('/').length - 1]
  await page.goto(advertisementUrl, { waitUntil: 'networkidle0' })
  await wait(2000)
  const ssName = `advertisement_${advertisementId}.png`
  const filePath = path.resolve(
    __dirname,
    '..',
    '..',
    'generated',
    'screenshots',
    ssName
  )
  await page.screenshot({
    path: filePath,
  })

  return {
    advertisementId,
    ssName,
  }
}
