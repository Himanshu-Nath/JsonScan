const express = require('express');
const router = express.Router();
const { formatJson, jsonToXml, jsonToQRCode } = require('../controllers/jsonFormat')

router.post('/format', formatJson);
router.post('/to-xml', jsonToXml);
router.post('/qrcode', jsonToQRCode);
module.exports = router;