const express = require('express');
const cors = require('cors');
const jsonRoutes = require('./routes/jsonFormat');
require('dotenv').config();

const app = express()
app.use(express.text('*/*'));
app.use(cors());
app.use('/json', jsonRoutes)

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`JsonScan backend app listening at http://localhost:${PORT}`);
})