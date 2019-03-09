const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extend: true }));
app.use(bodyParser.json());

const todo = [
    { id: 1, description: 'Clean the house', createdOn: '08/02/2019' },
    { id: 2, description: 'wash the deshes', createdOn: '08/03/2019' },
    { id: 3, description: 'Complete my Assignement', createdOn: '08/04/2019' },
    { id: 4, description: 'Write some code', createdOn: '08/05/2019' },
];

app.post('/', (req, res) => {
    console.log(req.body);
    const { id } = req.body;
    const descp = req.body.description;
    const creation = Date.now();// eslint-disable-line
    const exist = todo.find(item => {// eslint-disable-line
        return item.id === parseInt(id, 10);
    });
    res.send({
        id, descp,
    });
});

app.get('/', (req, res) => {
    res.send({
        todo, statusCode: 200,
    });
});

app.listen(port, () => {
    console.log('server running on 3000');
});

module.exports = app;
