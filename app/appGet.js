
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

module.exports = router;