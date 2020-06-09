// this is app.js. Myprogram will start with here.
// import lib
const path = require('path')
const express = require('express')
const hbs = require('hbs')
// import define
const getRouter = require('./appGet')

// code here
const app= express();
const port = 3000
const viewsFolder = path.join(__dirname, 'views')
const staticFolder = path.join(__dirname, 'static')

app.set('views',viewsFolder)
app.set('view engine', 'html')
app.engine('html', hbs.__express)

app.use(express.static(staticFolder)); console.log(`The app has static folder which root is static.`)
app.use(getRouter)

app.listen(port);
console.log(`The app is running at http://localhost:${port}.`)

// https

// import fs = require('fs')
// const keyFile = './static/assets/key.txt'
// const certFile = './static/assets/cert.txt'
// const sslOption = {
//     key: fs.readFileSync(keyFile),
//     cert: fs.readFileSync(certFile),
//     passphrase: '1234'
// }
//
// import https = require('https')
// import express = require('express');
// const app: express.Application = express();
// const port: number = 3000
// const server = https.createServer(sslOption, app)
// server.listen(port)
// console.log(`The app is running at http://localhost:${port}.`)            
