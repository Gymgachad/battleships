const express = require('express');
const http = require('http');

const app = express();

app.use(express.static('static')); // Static files

const server = http.createServer(app);

const PORT = 8000

server.listen(PORT, () => {
  console.log(`listening on *:${PORT}`);
})
