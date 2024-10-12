import { Page } from 'puppeteer'
import { wait } from '@utils/helperFunctions'

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

export const selectVehicleDropdownValue = async ({
  page,
  selector,
  value,
  endpoint,
  timeout,
}: {
  page: Page
  selector: string
  value: string
  endpoint?: string
  timeout?: number
}) => {
  console.log('Value a seleccionar: ', value)
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

export const fillVehicleInput = async ({
  page,
  selector,
  value,
}: {
  page: Page
  selector: string
  value: string
}) => {
  console.log('Llenando: ', selector)
  await page.focus(selector)
  await page.keyboard.type(value)
}
