const mysql = require('mysql2/promise')
const config = require('../config/database')

let connectionPool = mysql.createPool(config)


module.exports.query = async (sql) => {
    const connection = await connectionPool.getConnection()
    const [rows, fields] = await connection.excute(sql)
    if (rows.length !== 0) {
        return rows
    } else {
        return null
    }
}


module.exports.getUserId = async (username) => {
    const connection = await connectionPool.getConnection()
    const [rows, fields] = await connection.excute(`SELECT uid WHERE username = ${user.usernmae}`)
    if (rows.length !== 0) {
        return rows
    } else {
        return null
    }
}