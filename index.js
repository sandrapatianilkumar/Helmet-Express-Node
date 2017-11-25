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

/**
 * Requiring express csp helmet
 * This is an Express extension which allows you to set the content-security-policy for your Express Application.
 * https://www.npmjs.com/package/express-csp
 */
const csp = require('express-csp-header');

const cspMiddleware = csp({
    policies: {
        'default-src': [csp.NONE],
        'script-src': [csp.NONCE],
        'style-src': [csp.NONCE],
        'img-src': [csp.SELF],
        'font-src': [csp.NONCE, 'fonts.gstatic.com'],
        'object-src': [csp.NONE],
        'block-all-mixed-content': true,
        'frame-ancestors': [csp.NONE]
    }
});

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cspMiddleware);

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
    res.send(`
    <h1>Hello World</h1>
    <style nonce=${req.nonce}>
    .blue {background:cornflowerblue;color:white}
    </style>
    <p class="blue"> This should have a blue background because of the loaded styles </p>
    <style>
    .red {background:maroon;color:white}
    </style>
    <p class="red"> This should not  have a red background, tgue styles are not loaded because of the missings nonce </p>
    `);
});

//listening express
app.listen(PORT, () => {
    console.log(`Listening on http://loalhost:` + PORT);
});