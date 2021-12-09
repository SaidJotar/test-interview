const CONSTANTS = require('../CONSTANTS.js');
const express = require ('express');
const app = express();
const morgan = require('morgan');

// Settings
app.set('port', CONSTANTS.GATEWAY_PORT);
//app.set('json spaces', 2);

// Middlewares
app.use(morgan('dev'));
// Allow to send and receive JSON format
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Routes
app.use(require('./routes/radar'));

// Starting Server
app.listen(3000,() => {
	console.log(`Server on port ${app.get('port')}`);
});