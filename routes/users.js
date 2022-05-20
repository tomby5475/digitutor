const router = require("express").Router();
const User = require('../models/User.model')

router.get('/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => next(err))
});

router.get('/', (req, res, next) => {
  User.find()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => next(err))
});

router.delete('/:id', (req, res, next) => {
  User.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(200).json({ message: 'profile deleted' })
    })
    .catch(err => next(err))
});
console.log("test");

module.exports = router;
