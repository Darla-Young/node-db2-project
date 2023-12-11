const router = require('express').Router()
const Cars = require('./cars-model')
const {
  checkCarId,
  checkCarPayload,
  checkVinNumberValid,
  checkVinNumberUnique,
} = require('./cars-middleware')

router.get('/', (req, res) => {
  Cars.getAll()
    .then(arr => res.json(arr))
    .catch(err => res.status(500).json(err))
})

router.get('/:id', checkCarId, (req, res) => {
  Cars.getById(req.params.id)
    .then(car => res.json(car))
    .catch(err => res.status(500).json(err))
})

router.post('/', checkCarPayload, checkVinNumberValid, checkVinNumberUnique, (req, res) => {
  Cars.create(req.body)
    .then(car => res.json(car))
    .catch(err => res.status(500).json(err))
})