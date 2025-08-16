const logger = require('../utils/logger');
const QRCode = require('qrcode');

function convert1Dto2D(qr) {
  const size = qr.modules.size;
  const data = qr.modules.data;
  const matrix = [];

  for (let y = 0; y < size; y++) {
    const row = [];
    for (let x = 0; x < size; x++) {
      const index = y * size + x;
      row.push(data[index] === 1);
    }
    matrix.push(row);
  }

  return matrix;
}

async function generateQRCodeMatrix(text) {
  console.info('Inside generateQRCodeMatrix function');
  const qr = QRCode.create(text, { errorCorrectionLevel: 'M' });
  const matrix = convert1Dto2D(qr);
  console.info('qrMatrix sample:', matrix[0]);
  return matrix;
} 

module.exports = {
    generateQRCodeMatrix
}