const mysql = require("mysql")
const config = require("../config/database")

const operates = {}

const connection = mysql.createConnection(config)
const connectionPool = mysql.createPool(config)

function getConnection() {
    return connectionPool.getConnection()
}

operates.query = (sql) => {
    const connection = getConnection();
    
    connection.query(sql)
    .on('error', (err)=>{
        console.log(`[Query Error]: ${err}`)
    })
    .on('result', (res)=>{
        return res
    })
}

operates.query('SELECT * FROM ')