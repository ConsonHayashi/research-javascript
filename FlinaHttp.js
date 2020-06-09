const fs = require('fs')

const writeCommonFile = (filePath, fileData) => {
    // 同步追加和写入文件
    // 只用一次写入，不存在效率问题
    try {
        fs.writeFileSync(filePath, fileData);
        console.log(`Write file ${filePath} success.`);
    }catch (err) {
        console.log('Something in file system is wrong, please check at : ', err);
    }
}

const makeConfigFile = (configFilePath, configFileData) =>{
    writeCommonFile(configFilePath, configFileData)
}

const makeAppjsFile = (appjsFilePath, appjsFileData) => {
    writeCommonFile(appjsFilePath, appjsFileData)
}

const makeAppGetjsFile = (appGetjsFilePath, appGetjsFileData) => {
    writeCommonFile(appGetjsFilePath, appGetjsFileData)
}


const getConfigFileData = _ => {
    const configFileData = 
`
{
    "name": "flina_http",
    "version": "1.0.0",
    "description": "Maked by Pedro.",
    "main": "app.js",
    "scripts": {
        "dev": "nodemon app/app.js"
    },
    "author": "qinglin",
    "license": "ISC",
    "dependencies": {
        "express": "^4.17.1",
        "hbs": "^4.1.1"
    },
    "devDependencies": {
        "nodemon": "^1.19.3"
    }
}
` 
    return configFileData
}

const getAppjsFileData = _ => {   
    const appjsFileData = 
`// this is app.js. Myprogram will start with here.
const path = require('path')
const express = require('express')

const hbs = require('hbs')

const router = require('./appGet')
const app= express();

const port = 3000
const viewsFolder = path.join(__dirname, 'views')
const staticFolder = path.join(__dirname, 'static')

// app.set('port', process.env.PROT || port)
app.set('views',viewsFolder)
app.set('view engine', 'html')
app.engine('html', hbs.__express)

app.use(express.static(staticFolder)); console.log(\`The app has static folder which root is static.\`)
// app.use(express.favicon())
// app.use(express.logger('dev'))
// app.use(express.bodyParser())
// app.use(express.methodOverride())
// app.use(app.router)

app.use(router)


// app.listen(app.get('port'))
app.listen(port);
console.log(\`The app is running at http://localhost:\${port}.\`)

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
// console.log(\`The app is running at http://localhost:\${port}.\`)            
`;   
    return appjsFileData
}

const getAppGetjsFileData = _ => {
    const appGetjsFileData =
`
const express = require('express')
const Router = express.Router

let router = Router()

const getRoot = (req, res) => {res.redirect('/home')}

const getIndex = (req, res) => {res.render('index', {message: 'HelloWorld, pedro'})}

const getAdmin = (req, res) => {res.end('Hello Admin!')}

const getVisitor = (req, res) => {
    if (req.params.who){
        res.end('Hello ' + req.params.who + '.')
    } else {
        res.end('Hello, Guest.')
    }
}

const getFile = (req, res)=> {res.sendFile(__dirname + '/static/assets/柯南1.jpg')}

const getAbout = (req, res) => {res.end('About')}

const get404 = (req, res) => {res.end('404')}

const appGet = (router) => {

    // router.all('*',(req, res, next)=>{
    //     res.writeHead(200, {'Content-Type': 'text/plain'});
    //     next()
    // })
    // router.get('/', (req, res) => {res.end('Hello World!')})
    router.get('/', getRoot)
    router.get('/admin', getAdmin)
    router.get('/home', getIndex)
    // router.get('/home', (req, res) => {res.send('HelloWorld')})
    router.get('/about', getAbout)
    // router.get('/visitor/:who', (req, res) => {res.end('Hello ' + req.params.who + '.')})
    router.get('/visitor/:who?', getVisitor)
    router.get('/file', getFile)//path must be absolute or specify root to res.sendFile

    router.get('*', get404)

    return router
}
router = appGet(router)

module.exports = router;`
    return appGetjsFileData
}

const makeProjectDirs = (projectDirs) => {
    console.log('-----');
    projectDirs.forEach(projectDir => {
        fs.mkdirSync(projectDir);
        console.log(`mkdir ${projectDir} success.`);
    }); 
} 

const init = _ => {
    const projectDirs = [             
        'app',
        'app/static',           //项目静态文件
        'app/static/scripts',
        'app/static/css',
        'app/static/assets',
        'app/static/uploads',
        'app/views',            //项目html文件
    ];
    makeProjectDirs(projectDirs);
    const configFilePath = 'package.json';
    const appjsFilePath = 'app/app.js'
    const appGetjsFilePath = 'app/appGet.js'
    
    makeConfigFile(configFilePath, getConfigFileData())
    makeAppjsFile(appjsFilePath, getAppjsFileData())
    makeAppGetjsFile(appGetjsFilePath, getAppGetjsFileData())
}

init()