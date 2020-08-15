const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});
app.use("/src/js", express.static(__dirname + '/src/js'));
app.use("/src/css", express.static(__dirname + '/src/css'));
app.use("/src/images", express.static(__dirname + '/src/images'));
app.listen(port, () => console.log(`todo listening on port ${port}!`));