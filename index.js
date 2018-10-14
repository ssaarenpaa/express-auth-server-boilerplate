const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require("./router");
const app = express();
const mongoose = require('mongoose');

// App setup
app.use(morgan("combined"));
app.use(bodyParser.json({ type: '*/*'}));
router(app);


// Server setup
const port = process.env.port || 3090;
const server = http.createServer(app);
server.listen(port);


// DB setup

mongoose.connect('mongodb://localhost:auth/auth', { useNewUrlParser: true});
console.log(`Server listening on: ${port}`);