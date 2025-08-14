const express = require('express');
const router = express.Router();
const { formatJson } = require('../controllers/jsonFormat')

router.post('/format', formatJson);
module.exports = router;