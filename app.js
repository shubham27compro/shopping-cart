const express = require("express");
var path = require('path');

const PORT = process.env.PORT || 5000;

var server = express();
server.get('/', (req, res) => res.sendFile('index.html', { root: __dirname }));
server.use('/files', express.static(path.join(__dirname, '/files')));
server.listen(PORT, ()=>{ console.log("Listening on port: "+PORT);  });