const router = require("express").Router();
const User = require('../models/User.model')


// get a user info
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


module.exports = router;
