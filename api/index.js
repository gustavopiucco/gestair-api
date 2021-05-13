const express = require('express');

const app = express();

app.route('/').get((req, res) => {
    res.send('ok');
});

const port = 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});