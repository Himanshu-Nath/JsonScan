const js2xmlparser = require('js2xmlparser');
const { createCanvas } = require('canvas');
const logger = require('../utils/logger');
const qrCodeService = require('../services/qrCodeService');
require('dotenv').config(); 0

const formatJson = async (req, res) => {
    logger.info('checkJson API started');
    const rawInput = req.body;
    logger.info(rawInput);
    try {
        const parsed = JSON.parse(rawInput);
        const formattedJson = JSON.stringify(parsed, null, 2);
        res.status(201).send({ valid: true, "output": formattedJson });
    } catch (err) {
        logger.error(`checkJson API error: ${err.message}`);
        res.status(500).json({ valid: false, error: 'Invalid JSON input', "message": err.message });
    }
};

const jsonToXml = async (req, res) => {
    logger.info('jsonToXml API started');
    const rawInput = req.body;
    logger.info(rawInput);
    try {
        const parsed = JSON.parse(rawInput);
        const xml = js2xmlparser.parse('root', parsed);
        res.status(201).type('application/xml').send({ valid: true, "output": xml });
    } catch (err) {
        logger.error(`jsonToXml API error: ${err.message}`);
        res.status(500).json({ valid: false, error: 'Invalid JSON input', "message": err.message });
    }
};

const jsonToQRCode = async (req, res) => {
    logger.info('jsonToQRCode API started');
    const userData = req.body;
    logger.info(userData);
    if (!userData) {
        return res.status(400).json({ error: 'userData is required' });
    }

    const qrMatrix = await qrCodeService.generateQRCodeMatrix(JSON.stringify(userData));

    console.log('qrMatrix sample:', qrMatrix?.[0]);
    console.log('typeof cell:', typeof qrMatrix?.[0]?.[0]);
    if (!Array.isArray(qrMatrix) || qrMatrix.length === 0 || !Array.isArray(qrMatrix[0]) || typeof qrMatrix[0][0] !== 'boolean') {
        throw new Error('Invalid QR code matrix');
    }

    // Canvas setup
    const moduleSize = 10;
    const size = qrMatrix.length * moduleSize;
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, size, size);

    ctx.fillStyle = 'black';
    for (let y = 0; y < qrMatrix.length; y++) {
        for (let x = 0; x < qrMatrix[y].length; x++) {
            if (qrMatrix[y][x]) {
                ctx.fillRect(x * moduleSize, y * moduleSize, moduleSize, moduleSize);
            }
        }
    }

    res.setHeader('Content-Type', 'image/png');
    const stream = canvas.createPNGStream();

    stream.on('error', (err) => {
        console.error('PNGStream error:', err);
        res.status(400).json({ message: 'Invalid input' });
    });
    stream.pipe(res);
};

module.exports = {
    formatJson,
    jsonToXml,
    jsonToQRCode
}