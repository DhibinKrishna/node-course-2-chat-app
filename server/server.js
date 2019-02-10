const path = require('path'); //built in module, no need to install
const express = require('express');

const publicPath = path.join(__dirname + '/../public');
//console.log(__dirname + '/../public'); //old way
//console.log(path.join(__dirname + '/../public'));
const port = process.env.PORT || 3000;

var app = express();

app.use(express.static(publicPath));

app.listen(3000, () => {
    console.log(`Server up on port ${port}`);
});