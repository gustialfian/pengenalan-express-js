/**
 * file ini berfungi untuk melakukan 
 * - inisiai database
 * - import secara otomatis model2 yang sudah di letakan difolder ini
 * - inisiasi default data
 */

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const db = {};

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
    })
    .catch(function (err) {
        console.error('Tidak dapat melakukan koneksi ke db: ', err);
    });

// membaca nama file pada folder ini
fs.readdirSync(__dirname)
    .filter(file => {
        // validasi
        // nama file dgn awalan . tidak valid
        // file ini tidak valid
        // dan harus diakhiri dgn .js
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        // melakukan import secara manual
        const model = sequelize['import'](path.join(__dirname, file));
        db[model.name] = model;
    });

// mengambil model Job yg sebelumnya sudah di import manual
const { Job } = db;

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

    })
    .then(function () {
        console.log('data berhasil di masukan');
    })
    .catch(function (err) {
        console.error('Error muncul saat membuat table: ', err);
    });

// instace database juga disimpan jika nanti instance ini di perlukan di file lain.
db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;