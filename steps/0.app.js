// merujuk express
const express = require('express');

// instansiasi obejct express dan di simpan pada konstanta app
const app = express();

// contoh routing pada express
app.get('/', (req, res) => res.send('Hello World'));

// mendengarkan event yang terjadi pada localhost dengan port 3000
app.listen(3000, () => console.log('listenig on localhos:3000'));