const express = require('express');
const bodyParser = require('body-parser');


const app = express();

const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

require('./db');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {

});




app.listen(port, () => {
    console.log(`Ha iniciado el servidor en el puerto ${port}`);
})