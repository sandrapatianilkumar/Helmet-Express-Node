/**
 * requiring express 
 * Express supports robust routing catching 
 * https://www.npmjs.com/package/express
 */
const express = require('express');

/**
 * Requiring Helmet
 * Helmet helps you secure your Express apps by setting various HTTP headers.
 * https://helmetjs.github.io/
 */
const helmet = require('helmet');

const PORT = process.env.PORT || 3000;
const app = express();

// Sets "Strict-Transport-Security: max-age=5184000; includeSubDomains".
var sixtyDaysInSeconds = 5184000

app.use(helmet({
    dnsPrefetchControl: {
        allow: true
    },
    frameguard: {
        action: 'deny'
    },
    hsts: {
        maxAge: sixtyDaysInSeconds
    }
}));

//express route
app.get('/', (req, res) => {
    res.send(`<h1>Hello World</h1>`);
});

//listening express
app.listen(PORT, () => {
    console.log(`Listening on http://loalhost:` + PORT);
});