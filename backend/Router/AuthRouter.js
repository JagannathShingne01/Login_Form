const {singupValidation, loginValidation} = require('../Middlewares/AuthValidation')
const {signup, login} = require('../Controllers/AuthController')

const router = require('express').Router()

router.post("/login", loginValidation, login)
router.post("/signup", singupValidation, signup)

module.exports = router;