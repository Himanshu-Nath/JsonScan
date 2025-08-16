const express = require('express');
const router = express.Router();
const { formatJson, jsonToXml } = require('../controllers/jsonFormat')

router.post('/format', formatJson);
router.post('/to-xml', jsonToXml);
module.exports = router;