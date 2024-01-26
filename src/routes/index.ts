const { Router } = require('express')
const router = Router()

router.use('/games', require('./games'))


module.exports = router