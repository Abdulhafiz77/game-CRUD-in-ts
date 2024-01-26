"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Router } = require('express');
const router = Router();
router.use('/games', require('./games'));
module.exports = router;
//# sourceMappingURL=index.js.map