// npm i b0dy parser

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// middleware
app.use(bodyParser.json());

let db = [
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
];

app.get('/', (request, response) => response.send('Hello World'));

app.get('/jobs', (request, response) => {
    return response.json(db);
});

app.get('/jobs/:name', (request, response) => {
    const result = db.filter(val => {
        return val.name.toLocaleLowerCase() === request.params.name.toLocaleLowerCase();
    });
    return response.json(result);
});

app.post('/jobs', (request, response) => {
    const newJob = {
        id: db.length + 1,
        name: request.body.name,
        attack: request.body.attack,
        defence: request.body.defence,
        agility: request.body.agility,
        magic: request.body.magic,
    };

    db.push(newJob);
    
    return response.json(newJob);
});

app.put('/jobs/:name', (request, response) => {
    const theJob = db.filter(val => {
        return val.name.toLocaleLowerCase() === request.params.name.toLocaleLowerCase();
    });

    if (theJob === null) {
        return response.json('Not Found');
    }

    const newJob = {
        id: theJob[0].id,
        name: request.body.name || theJob[0].name,
        attack: request.body.attack || theJob[0].attack,
        defence: request.body.defence || theJob[0].defence,
        agility: request.body.agility || theJob[0].agility,
        magic: request.body.magic || theJob[0].magic,
    };

    db.push(newJob);
    
    return response.json(newJob);
});

app.delete('/jobs/:name', (request, response) => {
    db = db.filter(val => {
        return val.name.toLocaleLowerCase() !== request.params.name.toLocaleLowerCase();
    });

    return response.json(db);
});

app.listen(3000, () => console.log('listenig on localhos:3000'));