const Cars = require('./cars-model')
const vinValidator = require('vin-validator')
const db = require('../../data/db-config')

const checkCarId = async (req, res, next) => {
  const car = await Cars.getById(req.params.id)
  if (!car) res.status(404).json({message: `car with id ${req.params.id} is not found`})
  else next()
}

const checkCarPayload = (req, res, next) => {
  const { vin, make, model, mileage } = req.body
  const fieldArr = ['vin', 'make', 'model', 'mileage']
  const reqArr = [vin, make, model, mileage]
  let i = null
  for (let x in reqArr) if (!reqArr[x]) i = x
  if (i) res.status(400).json({message: `${fieldArr[i]} is missing`})
  else next()
}

const checkVinNumberValid = (req, res, next) => {
  if (!vinValidator.validate(req.body.vin)) {
    res.status(400).json({message: `vin ${req.body.vin} is invalid`})
  }
  else next()
}

const checkVinNumberUnique = (req, res, next) => {
  db('cars').where('vin', req.body.vin)
    .then(car => {
      if (car.length > 0) {
        res.status(400).json({message: `vin ${req.body.vin} already exists`})
      }
      else next()
    })
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
}