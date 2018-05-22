const jwt = require('jsonwebtoken')
const db = require('../modules/dbHelper')
const crypto = require('crypto')
const fs = require('fs')

let pem = fs.readFileSync('../key.pem')
let key = pem.toString('ascii')

const router = require('koa-router')()

router.post('/login', async (ctx) => {
    const user = ctx.request.body
    if (user && user.name){
        const pass = await db.query(`SELECT upass WHERE username = ${user.name}`)
        if (user.pass){
            const md5 = crypto.createHash('md5')
            const hmac = crypto.createHmac('sha1', key)
            md5.update(user.pass)
            if (md5.digest('hex') == pass) {
                let userToken = {
                    username:user.name,
                    userpass:user.pass,
                }
                const token = jwt.sign(userToken, hmac.digest('hex'), {expiresIn:'24h'})
            } else {
                ctx.body = {
                    message:'Wrong Password',
                    code: -1
                }
            }
        } else if (pass == null) {
            ctx.body = {
                message:'No user',
                code:-1
            }
        } else {
            ctx.body = {
                message:'No password',
                code:-1
            }
        }
    } else {
        ctx.body = {
            message:'No password',
            code: -1
        }
    }
})