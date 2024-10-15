import { Request } from 'express'
import { Vehicle } from '@customTypes/index'

const validateRequest = ({ req }: { req: Request }): boolean => {
  const { inputPrecio, inputDescription } = req.body
  console.log(req.body)
  if (!inputPrecio || !inputDescription) {
    throw new Error('Todos los campos son requeridos')
  }

  if (typeof Number(inputPrecio) !== 'number' || isNaN(Number(inputPrecio))) {
    throw new Error('inputPrecio debe ser un número válido')
  }

  if (typeof inputDescription !== 'string' || inputDescription.trim() === '') {
    throw new Error('inputDescription debe ser un string no vacío')
  }

  return true
}

export const createVehicle = ({ req }: { req: Request }): Vehicle => {
  validateRequest({ req })
  const { inputPrecio, inputDescription } = req.body

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
    description: inputDescription,
    distanceTraveled: 20000,
    distanceUnit: 'kms.',
    price: inputPrecio,
    transactionType: 'negociable',
    images,
    tier: 'Free',
  }
}
