var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var index = require('./routes/index');

app.set('port', process.env.PORT || 5000);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({expanded: true}));

app.use('/', index);

app.listen(app.get('port'), function(){
    console.log("Listening to port ", app.get('port'));
});

module.exports = app;