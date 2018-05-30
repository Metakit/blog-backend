const mysql = require('mysql2/promise')
const _ = require('lodash')
const config = require('../config/database')

let connectionPool = mysql.createPool(config)

async function getLimits(limits) {
    if (_.isEmpty(limits)) {
        return ""
    }
    const connection = await connectionPool.getConnection()
    let sql = "WHERE "
    let key_value_pairs = new Array(0)
    for (let key in limits) {
        if (limits.hasOwnProperty(key)) {
            let key_value_pair = new Array(0)
            let limit_value = await connection.escape(limits[key])
            key_value_pair.push(`\`${key}\``, limit_value)
            key_value_pairs.push(key_value_pair.join(" = "))
        }
    }
    sql += key_value_pairs.join(" AND ")
    return sql
}

module.exports.query = async (table, colunm, limits) => {
    if (!_.isString(table))
        throw new Error("Invalid tableName")
    const connection = await connectionPool.getConnection()

    let limits_string = await getLimits(limits)
    if (_.isArray(colunm))
        colunm = colunm.join(",")

    let sql = `SELECT ${colunm || "*"} FROM \`${table}\` ${limits_string};`
    const [rows, fields] = await connection.query(sql)

    if (rows.length === 0)
        return null
    else if(rows.length === 1)
        return rows[0]
    else return rows
}

// TODO:add test function in test folder
module.exports.update = async (table, columns) => {
    const connection = await connectionPool.getConnection()

    // const [rows, fields] = await connection.
}

// TODO:add test function in test folder
module.exports.insert = async (table, values) => {
    const connection = await connectionPool.getConnection()

    if (_.isArray(values))
        values = values.map((value) => {
            return connection.escape(value)
        }).join(", ")

    let sql = `INSERT INTO ${table} VALUES(${values})`

    const [rows, fields] = await connection.execute(sql)

    if(rows.length === 0)
        return null
    else return rows[0]
}