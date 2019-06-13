const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fs = require('fs');
const marked = require('marked');

const routes = require('./config/routes');

const PORT = process.env.PORT || 8080;
const MONGO_USER = process.env.MONGO_USER || 'pedlop';
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || 'YBZs7GpUrgL5E4NR';
const MONGO_DB = process.env.MONGO_DB || 'palindrome';

const server = express();

server.use(bodyParser.json());

server.use((request, response, next) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, OPTIONS, HEAD');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Set-Cookie, Cookie');
  if (request.method === 'OPTIONS') {
    return response.sendStatus(200);
  }
  next();
});

server.get('/', function (req, res) {
  var path = __dirname + '/README.md';
  var file = fs.readFileSync(path, 'utf8');
  res.send(marked(file.toString()));
});

routes.configureRoutes(server);

mongoose.connect(`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@graphqlapp-y9axg.mongodb.net/${MONGO_DB}?retryWrites=true`, { useNewUrlParser: true }).then(() => {
  server.listen(PORT, () => console.log(`Listening on ${PORT}`));
}).catch(err => {
  console.log(err)
});
