import { ElementHandle, Page } from 'puppeteer'
import {
  fillVehicleInput,
  selectVehicleDropdownValue,
  takeAdScreenShot,
} from '@utils/seminuevosHelperFunctions'
import { Vehicle } from '@customTypes/Vehicle'
import { wait } from '@utils/helperFunctions'
import path from 'path'

export const authenticateToSite = async ({ page }: { page: Page }) => {
  console.log('Authenticating to site...')
  const loginBtn = await page.locator('a.login-btn')

  await Promise.all([
    loginBtn.click(),
    page.waitForNavigation({ waitUntil: 'networkidle0' }),
  ])

  await page.screenshot({
    path: `ss/01_login.png`,
  })

  const emailInput = await page.locator('#email')
  await emailInput.fill(`${process.env.SEMINUEVOS_USER}`)
  const passwordInput = await page.locator('#password')
  await passwordInput.fill(`${process.env.SEMINUEVOS_PASSWORD}`)
  const submitBtn = await page.locator('button[type="submit"]')

  await page.screenshot({
    path: `ss/02_loginForm_filled.png`,
  })

  await Promise.all([
    await submitBtn.click(),
    page.waitForNavigation({ waitUntil: 'networkidle0' }),
  ])

  console.log('Authenticated succesfully!')
  console.log('Redirecting to home page...')

  await page.screenshot({
    path: `ss/03_home.png`,
  })

  const vendeTuVehiculoBtn = await page.locator('a.btn-primary')

  await Promise.all([
    await vendeTuVehiculoBtn.click(),
    page.waitForNavigation({ waitUntil: 'networkidle0' }),
  ])

  console.log('Redirection to home page completed succesfully!')

  await page.screenshot({
    path: `ss/04_vende_tu_vehiculo.png`,
  })
}

const fillSelectDropdownFields = async ({
  page,
  vehicle,
}: {
  page: Page
  vehicle: Vehicle
}) => {
  await selectVehicleDropdownValue({
    page,
    selector: 'dropdown_types',
    value: vehicle.type,
    timeout: 3000,
  })

  await page.screenshot({
    path: `ss/05_dropdown_types_autos.png`,
  })

  console.log('Seleccionado tipo: Autos!!!')
  console.log('Las marcas han sido cargadas. Seleccionando marca...')

  await selectVehicleDropdownValue({
    page,
    selector: 'dropdown_brands',
    value: vehicle.brand,
    endpoint: 'api/v1/catalog_type/1/brand/1/model',
  })

  await page.screenshot({
    path: `ss/06_dropdown_brands_acura.png`,
  })
  console.log('Seleccionado Marca: Acura')
  console.log('Los modelos han sido cargados. Seleccionando modelo...')

  await selectVehicleDropdownValue({
    page,
    selector: 'dropdown_models',
    value: vehicle.model,
    endpoint: 'api/v1/catalog_type/1/brand/1/model/1002/subtype',
  })

  await page.screenshot({
    path: `ss/07_dropdown_models_ilx.png`,
  })

  await selectVehicleDropdownValue({
    page,
    selector: 'dropdown_subtypes',
    value: vehicle.subtype,
    // endpoint: 'api/v1/catalog_type/1/brand/1/model/1002/subtype',
  })

  await page.screenshot({
    path: `ss/08_dropdown_subtypes.png`,
  })

  await selectVehicleDropdownValue({
    page,
    selector: 'dropdown_years',
    value: vehicle.year.toString(),
  })

  await page.screenshot({
    path: `ss/09_dropdown_years.png`,
  })

  await selectVehicleDropdownValue({
    page,
    selector: 'dropdown_provinces',
    value: vehicle.province,
    endpoint: 'api/v1/catalog_city/2',
  })

  await page.screenshot({
    path: `ss/010_dropdown_provinces.png`,
  })

  await selectVehicleDropdownValue({
    page,
    selector: 'dropdown_cities',
    value: vehicle.city,
  })

  await page.screenshot({
    path: `ss/011_dropdown_cities.png`,
  })

  await selectVehicleDropdownValue({
    page,
    selector: 'dropdown_mileageType',
    value: vehicle.distanceUnit,
  })

  await page.screenshot({
    path: `ss/012_distance_unit.png`,
  })

  await selectVehicleDropdownValue({
    page,
    selector: 'dropdown_negotiable',
    value: vehicle.transactionType,
  })

  await page.screenshot({
    path: `ss/013_dropdown_negotiable.png`,
  })
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
  console.log('Kilometraje lleno!')

  await fillVehicleInput({
    page,
    selector: '#input_precio',
    value: vehicle.price.toString(),
  })
  console.log('Precio lleno!')

  await page.screenshot({
    path: `ss/014_inputs.png`,
  })
}

const fillPageOneForm = async ({
  page,
  vehicle,
}: {
  page: Page
  vehicle: Vehicle
}) => {
  console.log('Formulario pt 1. Seleccionando valores de dropdowns')
  await fillSelectDropdownFields({ page, vehicle })
  console.log('Formulario pt 1. Valores de dropdowns seleccionados!')
  console.log('Formulario pt 1. Llenando valores de texto')
  await fillTextInputs({ page, vehicle })
  console.log('Formulario pt 1. Valores de texto llenos!')
  console.log('Accediendo a Formulario pt 2')
  await clickNextBtn({ page })
  await page.waitForSelector('#input_text_area_review')
  await page.screenshot({
    path: `ss/016_step_2.png`,
  })
  console.log('Formulario pt 2 disponible')
}

const uploadImages = async ({
  page,
  vehicle,
}: {
  page: Page
  vehicle: Vehicle
}) => {
  console.log('Esto es process cdw: ', process.cwd())
  const fileInputSelector = 'input[type="file"]#Uploader'

  // TODO: Reemplazar con rutas guardadas desde request.
  // Por ahora usando imagenes de prueba
  const filePaths = [
    path.relative(process.cwd(), 'public/images/01_acura.jpg'),
    path.relative(process.cwd(), 'public/images/02_acura.jpg'),
    path.relative(process.cwd(), 'public/images/03_acura.jpg'),
  ]

  const fileInput = await page.$(fileInputSelector)
  if (fileInput) {
    await fileInput.uploadFile(...filePaths)
  } else {
    throw new Error('Could not find input file. Cannot upload vehicle images')
  }

  await wait(3000)
  await page.screenshot({
    path: `ss/018_images_uploaded.png`,
  })
}

const fillPageTwoForm = async ({
  page,
  vehicle,
}: {
  page: Page
  vehicle: Vehicle
}) => {
  await fillVehicleInput({
    page,
    selector: '#input_text_area_review',
    value: vehicle.description,
  })
  console.log('Descripcion agregada!')

  await page.screenshot({
    path: `ss/017_description.png`,
  })

  await uploadImages({ page, vehicle })
  console.log('La URL actual antes de dar click en next:', page.url())
  await clickNextBtn({ page })
  await wait(8000) // TODO: buscar cual es el endppoint que se ejecuta cuando se sube imagenes y esperar a que finalice
  await page.screenshot({
    path: `ss/019_tier_selection.png`,
  })
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
  const currentUrl = page.url()
  console.log('La URL actual es:', currentUrl)
  console.log('Tomando ss')
  await takeAdScreenShot({ page, url: currentUrl })
  console.log('SS tomada, fin!!!!')
}
