// merujuk express, body-parser
const express = require('express');
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');

// inisialisasi sequelize client dgn dialect sqlite
// dialect ini bisa diganti dengan mysql, postgres, mssql tergantung db yg digunakan
// untuk tutorial ini saya menggunakan sqlite saja
const sequelize = new Sequelize('mainDB', null, null, {
    dialect: "sqlite",
    // opsi storage ini hanya untuk SQLite
    // jika menggunakan mysql atau postgress biasanya menggunakan opsi host
    storage: './test.sqlite',
});

// cek koneksi ke db.
sequelize
    .authenticate()
    .then(function () {
        console.log('Koneksi ke db terlah berhasil.');
    }, function (err) {
        console.log('Tidak dapat melakukan koneksi ke db: ', err);
    });

// mendefinisikan model
const Job = sequelize.define('Job', {
    name: Sequelize.STRING,
    attack: Sequelize.INTEGER,
    defence: Sequelize.INTEGER,
    agility: Sequelize.INTEGER,
    magic: Sequelize.INTEGER,
});

// sinkronasi skema db
sequelize
    .sync({ force: true })
    .then(function () {
        // pada saat callback ini di panggil table sudah dibuat
        // dan kita sudah bisa memasukan data ke db
        return Job.bulkCreate([
            {
                id: 1,
                name: 'Warior',
                attack: 100,
                defence: 50,
                agility: 30,
                magic: 0,
            },
            {
                id: 2,
                name: 'Mage',
                attack: 10,
                defence: 20,
                agility: 50,
                magic: 100,
            },
        ]);

    }, function (err) {
        console.log('Error muncul saat membuat table: ', err);
    })
    .then(function (jobs) {
        console.log('data berhasil di masukan');
    });


// instansiasi obejct express dan di simpan pada konstanta app
const app = express();

// gunakan body parser sebgai middleware
app.use(bodyParser.json());

/**
 * baris kode untuk db dummy kita ganti dengan sequlize
 * 
 * 
 */

// contoh routing pada express
app.get('/', (request, response) => response.send('Hello World'));

// memberikan List job
app.get('/jobs', (request, response) => {
    Job.findAll().then(function (jobs) {
        return response.json(jobs);
    });
});

// memberikan job spesifik sesuai dengan nama yang ada pada url
app.get('/jobs/:name', (request, response) => {
    Job.findOne({
        where: {
            name: request.params.name,
        }
    })
    .then(function (job) {
        if (job == null) {
            return response.json('Not Found');
        }

        return response.json(job);
    });
});

// memasukan job baru
app.post('/jobs', (request, response) => {
    Job.create({
        name: request.body.name,
        attack: request.body.attack,
        defence: request.body.defence,
        agility: request.body.agility,
        magic: request.body.magic,
    }).then(function (job) {
        return response.json(job);
    });
});

// mengubah job yang ada
app.put('/jobs/:name', (request, response) => {
    Job.findOne({
        where: {
            name: request.params.name,
        }
    })
    .then(function (job) {
        if (job == null) {
            return response.json('Not Found');
        }

        return job.update({
            name: request.body.name || job.name,
            attack: request.body.attack || job.attack,
            defence: request.body.defence || job.defence,
            agility: request.body.agility || job.agility,
            magic: request.body.magic || job.magic,
        })
    })
    .then(function (job) {
        return response.json(job);
    });
});

// menghapus job yang ada
app.delete('/jobs/:name', (request, response) => {
    Job.findOne({
        where: {
            name: request.params.name,
        }
    })
    .then(function (job) {
        if (job == null) {
            return response.json('Not Found');
        }

        return job.destroy();
    })
    .then(function (job) {
        return response.json('Data has been deleted');
    });
});

// mendengarkan event yang terjadi pada localhost dengan port 3000
app.listen(3000, () => console.log('listenig on localhos:3000'));