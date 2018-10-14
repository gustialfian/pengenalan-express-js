/**
 * file ini berfungsi untuk mendefinisikan route
 * yang nantinya akan kita panggil manual pada file app.js
 * 
 */

const { Job } = require('../models');
const { check, validationResult } = require('express-validator/check');
const express = require('express');
const router  = express.Router();

// memberikan List job
router.get('/', (request, response) => {
    Job.findAll().then(function (jobs) {
        return response.json(jobs);
    })
    .catch(function (err) {
        console.error('Something happend');
    });
});

// memberikan job spesifik sesuai dengan nama yang ada pada url
router.get('/:name', (request, response) => {
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
    })
    .catch(function (err) {
        console.error('Something happend');
    });
});

// memasukan job baru
router.post('/', [
    // method check digunakan untuk melakukan pengecekan value yang ada 
    // di body request dengan chain method selanjutnya
    check('name', 'nilai harus string').isString(),
    check('attack', 'nilai harus angka').isNumeric(),
    check('defence', 'nilai harus angka').isNumeric(),
    check('agility', 'nilai harus angka').isNumeric(),
    check('magic', 'nilai harus angka').isNumeric(),
], (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        response.status(422);
        return response.json({ errors: errors.array() });
    }

    Job.create({
        name: request.body.name,
        attack: request.body.attack,
        defence: request.body.defence,
        agility: request.body.agility,
        magic: request.body.magic,
    })
    .then(function (job) {
        response.status(201);
        return response.json(job);
    })
    .catch(function (err) {
        console.error('Something happend');
    });
});

// mengubah job yang ada
router.put('/:name', [
    check('name', 'nilai harus string').isString(),
    check('attack', 'nilai harus angka').isNumeric(),
    check('defence', 'nilai harus angka').isNumeric(),
    check('agility', 'nilai harus angka').isNumeric(),
    check('magic', 'nilai harus angka').isNumeric(),
], (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        response.status(422);
        return response.json({ errors: errors.array() });
    }

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
    })
    .catch(function (err) {
        console.error('Something happend');
    });
});

// menghapus job yang ada
router.delete('/:name', (request, response) => {
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
    })
    .catch(function (err) {
        console.error('Something happend');
    });
});

module.exports = router;