// requiring express 
const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();

//express route
app.get('/', (req, res) => {
    res.send(`<h1>Hello World</h1>`);
});

//listening express
app.listen(PORT, () => {
    console.log(`Listening on http://loalhost:` + PORT);
});