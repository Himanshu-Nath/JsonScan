const js2xmlparser = require('js2xmlparser');
const logger = require('../utils/logger');
require('dotenv').config();0

const formatJson = async (req, res) => {
    logger.info('checkJson API started');
    const rawInput = req.body;
    logger.info(rawInput);
    try {
        const parsed = JSON.parse(rawInput);
        const formattedJson = JSON.stringify(parsed, null, 2);
        res.status(201).send({ valid: true, "output": formattedJson });
    } catch(err) {
        logger.error(`checkJson API error: ${err.message}`);
        res.status(500).json({ valid: false, error: 'Invalid JSON input', "message" : err.message });
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
    } catch(err) {
        logger.error(`jsonToXml API error: ${err.message}`);
        res.status(500).json({ valid: false, error: 'Invalid JSON input', "message" : err.message });
    }
};

module.exports = {
    formatJson,
    jsonToXml
}