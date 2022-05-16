const router = require("express").Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { isAuthenticated } = require('../middleware/jwt')
const User = require('../models/User.model')


router.post('/signup', (req, res, next) => {
    console.log(req.body);
	const { email, password, username, role, discipline, phone, addinfo} = req.body
	if (email === '' || password === '' || username === '') {
		res.status(400).json({ message: 'Provide email, password and name' })
		return
	}
	if (password.length < 4) {
		res.status(400).json({ message: 'Password has to be 4 chars min' })
		return
	}
	// check the database if a user with the same email exists
	User.findOne({ email })
		.then(foundUser => {
			// if the user already exists send an error
			if (foundUser) {
				res.status(400).json({ message: 'User already exists' })
				return
			}
			// hash the password
			const salt = bcrypt.genSaltSync();
			const hashedPassword = bcrypt.hashSync(password, salt)
			// create the new user
			return User.create({ role, username, email, password: hashedPassword, discipline, phone, addinfo })
				.then(createdUser => {
					const { email, username, _id, role, discipline, phone, addinfo } = createdUser
					const user = { email, username, _id, role, discipline, phone, addinfo }
					res.status(201).json({ user: user })
				})
				.catch(err => {
					console.log(err)
					res.status(500).json({ message: 'Internal Server Error' })
				})
		})
});

router.post('/login', (req, res, next) => {
	const { email, password } = req.body
	if (email === '' || password === '') {
		res.status(400).json({ message: 'Provide email and password' })
		return
	}
	User.findOne({ email })
		.then(foundUser => {
			if (!foundUser) {
				res.status(400).json({ message: 'User not found' })
				return
			}
			const passwordCorrect = bcrypt.compareSync(password, foundUser.password)
			if (passwordCorrect) {
				const { _id, email, username, role, discipline, phone, addinfo } = foundUser
				const payload = { _id, email, username, role, discipline, phone, addinfo }
				// create the json web token
				const authToken = jwt.sign(
					payload,
					process.env.JWT_SECRET,
					{ algorithm: 'HS256', expiresIn: '12h' }
				)
				res.status(200).json({ authToken })
			} else {
				res.status(401).json({ message: 'Unable to authenticate' })
			}
		})
		.catch(err => {
			console.log(err)
			res.status(500).json({ message: 'Internal Server Error' })
		})
});
router.get('/verify', isAuthenticated, (req, res, next) => {
	//if the token is valid we can access it on : req.payload
	console.log('request payload is: ', req.payload)
			res.status(200).json(req.payload)
		});

module.exports = router;


