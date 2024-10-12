import { Request } from 'express'
import { Vehicle } from '@customTypes/Vehicle'

export const createVehicle = ({ req }: { req: Request }): Vehicle => {
  // Create a new function to store the images and set the right values in the array
  const images: Array<string> = [
    'public/images/1.jpg',
    'public/images/2.jpg',
    'public/images/3.jpg',
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
