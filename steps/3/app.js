/**
 * dari 181 line sekarang file ini menjadi 23 line
 * sekarang file ini hanya berfungsi untuk entry point 
 * jika ingin menginstall middleware disini tempatnya
 * 
 */

// merujuk express, body-parser
const express = require('express');
const bodyParser = require('body-parser');

const Jobs = require('./routes/jobs');

// instansiasi obejct express dan di simpan pada konstanta app
const app = express();

// gunakan body parser sebgai middleware
app.use(bodyParser.json());

// contoh routing pada express
app.get('/', (request, response) => response.send('Hello World'));
app.use('/jobs', Jobs);

// mendengarkan event yang terjadi pada localhost dengan port 3000
app.listen(3000, () => console.log('listenig on localhos:3000'));