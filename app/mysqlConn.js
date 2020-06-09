const mysql = require('mysql')
const mysqlConfig = require('./mysqlConfig')

// 使用连接池
var mysqlConnPool =  mysql.createPool(mysqlConfig)

const responseDoReturn = (res, result) => {
    const resultJson = (typeof result === 'undefined') ? {code: '201', msg: 'faile to do'} : result
    res.json(result)
}

const query = (sqlStatement, callback) => {
    mysqlConnPool.getConnection((error, connection) =>{
        connection.query(sqlStatement, (error, rows) => {
            callback(err, rows)
            connection.release()
        })
    })
}

const queryArgs = (sqlStatement, args, callback) => {
    mysqlConnPool.getConnection((error, connection) =>{
        connection.query(sqlStatement, args, (error, rows) => {
            callback(err, rows)
            connection.release()
        })
    })
}

module.exports = {
    query: query,
    queryArgs: queryArgs,
    responseDoReturn: responseDoReturn
}