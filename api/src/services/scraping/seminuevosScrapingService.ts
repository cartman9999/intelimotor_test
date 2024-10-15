import { Page } from 'puppeteer'
import {
  fillVehicleInput,
  selectVehicleDropdownValues,
  takeAdScreenShot,
  waitForResponse,
} from '@utils/seminuevosHelperFunctions'
import { wait } from '@utils/helperFunctions'
import path from 'path'
import { Ad, Vehicle } from '@customTypes/index'

export const authenticateToSite = async ({ page }: { page: Page }) => {
  console.log('Authenticating to site...')
  const loginBtn = await page.locator('a.login-btn')

  await Promise.all([
    loginBtn.click(),
    page.waitForNavigation({ waitUntil: 'networkidle0' }),
  ])

  const emailInput = await page.locator('#email')
  await emailInput.fill(`${process.env.SEMINUEVOS_USER}`)
  const passwordInput = await page.locator('#password')
  await passwordInput.fill(`${process.env.SEMINUEVOS_PASSWORD}`)
  const submitBtn = await page.locator('button[type="submit"]')

  await Promise.all([
    await submitBtn.click(),
    page.waitForNavigation({ waitUntil: 'networkidle0' }),
  ])

  console.log('Authenticated succesfully!')
  console.log('Redirecting to home page...')

  const vendeTuVehiculoBtn = await page.locator('a.btn-primary')

  await Promise.all([
    await vendeTuVehiculoBtn.click(),
    page.waitForNavigation({ waitUntil: 'networkidle0' }),
  ])

  console.log('Redirection to home page completed succesfully!')
}

const fillSelectDropdownFields = async ({
  page,
  vehicle,
}: {
  page: Page
  vehicle: Vehicle
}) => {
  console.log('Starting dropdown selection...')
  await selectVehicleDropdownValues({
    page,
    dropdowns: [
      {
        selector: 'dropdown_types',
        value: vehicle.type,
        timeout: 3000,
      },
      {
        selector: 'dropdown_brands',
        value: vehicle.brand,
        endpoint: 'api/v1/catalog_type/1/brand/1/model',
      },
      {
        selector: 'dropdown_models',
        value: vehicle.model,
        endpoint: 'api/v1/catalog_type/1/brand/1/model/1002/subtype',
      },
      {
        selector: 'dropdown_subtypes',
        value: vehicle.subtype,
      },
      {
        selector: 'dropdown_years',
        value: vehicle.year.toString(),
      },
      {
        selector: 'dropdown_provinces',
        value: vehicle.province,
        endpoint: 'api/v1/catalog_city/2',
      },
      {
        selector: 'dropdown_cities',
        value: vehicle.city,
      },
      {
        selector: 'dropdown_mileageType',
        value: vehicle.distanceUnit,
      },
      {
        selector: 'dropdown_negotiable',
        value: vehicle.transactionType,
      },
    ],
  })

  console.log('Dropdown selection completed!')
}

const fillTextInputs = async ({
  page,
  vehicle,
}: {
  page: Page
  vehicle: Vehicle
}) => {
  await fillVehicleInput({
    page,
    selector: '#input_recorrido',
    value: vehicle.distanceTraveled.toString(),
  })

  await fillVehicleInput({
    page,
    selector: '#input_precio',
    value: vehicle.price.toString(),
  })
}

const fillPageOneForm = async ({
  page,
  vehicle,
}: {
  page: Page
  vehicle: Vehicle
}) => {
  console.log('Vehicle form page 1')
  await fillSelectDropdownFields({ page, vehicle })
  await fillTextInputs({ page, vehicle })
  console.log('Vehicle form page 1 completed!')
  console.log('Vehicle form page 2')
  await clickNextBtn({ page })
  await page.waitForSelector('#input_text_area_review')
  console.log('Vehicle form completed!')
}

const uploadImages = async ({
  page,
  vehicle,
}: {
  page: Page
  vehicle: Vehicle
}) => {
  console.log('Uploading vehicle images...')
  const fileInputSelector = 'input[type="file"]#Uploader'
  const filePaths = vehicle.images.map(image =>
    path.relative(process.cwd(), image)
  )

  const fileInput = await page.$(fileInputSelector)
  if (fileInput) {
    await fileInput.uploadFile(...filePaths)

    await waitForResponse({
      page,
      endpoint: 'api/secure/vehicle/particular/upload-image/',
    })

    await wait(3000)
    console.log('Vehicle images uploaded succesfully!')
  } else {
    throw new Error('Could not find input file. Cannot upload vehicle images')
  }
}

const fillPageTwoForm = async ({
  page,
  vehicle,
}: {
  page: Page
  vehicle: Vehicle
}) => {
  console.log('Setting vehicle description')
  await fillVehicleInput({
    page,
    selector: '#input_text_area_review',
    value: vehicle.description,
  })

  await uploadImages({ page, vehicle })
  await clickNextBtn({ page })
  await waitForResponse({
    page,
    endpoint: 'api/secure/vehicle/user-publish/publish',
  })
  await page.waitForNavigation({ waitUntil: 'networkidle0' })
}

const clickNextBtn = async ({ page }: { page: Page }) => {
  await page.locator('.next-button:not(.back)').click()
}

export const fillOutVehicleForm = async ({
  page,
  vehicle,
}: {
  page: Page
  vehicle: Vehicle
}) => {
  await fillPageOneForm({ page, vehicle })
  await wait(1000)
  await fillPageTwoForm({ page, vehicle })
}

export const generateAdvertisement = async ({
  page,
}: {
  page: Page
}): Promise<Ad> => {
  const advertisment = await takeAdScreenShot({ page, url: page.url() })
  console.log('Ad created!')
  return advertisment
}
