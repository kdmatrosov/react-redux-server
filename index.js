const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./router');
const mongoose = require('mongoose');

// Настройка БД
mongoose.connect('mongodb://localhost:auth/auth');

const app = express();
// Настройка приложения
app.use(morgan('combined'));
app.use(bodyParser.json({type: '*/*'}));
router(app);

// Настройка сервера
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log(port);
