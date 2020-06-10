// this is app.js. Myprogram will start with here.
const path = require('path')
const express = require('express')
const router = require('./appGet')
const app= express();

const port = 1111
const staticFolder = path.join(__dirname, 'static')

app.use(express.static(staticFolder)); console.log(`The app has static folder which root is static.`)
app.use(router)

app.listen(port);
console.log(`The app is running at http://localhost:${port}.`)