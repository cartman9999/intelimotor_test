import { Request } from 'express'
import { Vehicle } from '@customTypes/index'

export const createVehicle = ({ req }: { req: Request }): Vehicle => {
  const images: Array<string> = [
    'public/images/01_acura.jpg',
    'public/images/02_acura.jpg',
    'public/images/03_acura.jpg',
  ]

  return {
    type: 'autos',
    brand: 'acura',
    model: 'ilx',
    subtype: 'sedan',
    year: 2018,
    province: 'nuevo leon',
    city: 'monterrey',
    description: 'Acura ILX sedán 2018, 2000 kms. Excelentes condiciones.', // Replace this with req value
    distanceTraveled: 2000,
    distanceUnit: 'kms.',
    price: 100000, // Replace this with req value
    transactionType: 'negociable',
    images,
    tier: 'Free',
  }
}
