const jwt = require('jsonwebtoken')
const db = require('../modules/dbHelper')
const crypto = require('crypto')
const fs = require('fs')


let pem = fs.readFileSync('key.pem')
let key = pem.toString('ascii')

const router = require('koa-router')()

router.post('/api/login', async (ctx) => {
    const user = ctx.request.body
    if (user && user.name){
        const res = await db.query("u_account", ["upass", "uid"], {"username":user.name})
        let pass = res["upass"]
        let uid = res["uid"]
        if (user.pass){
            const md5 = crypto.createHash('md5')
            const hmac = crypto.createHmac('sha1', key)
            md5.update(user.pass)
            if (md5.digest('hex') === pass) {
                userlist.push(uid)
                let userToken = {
                    username:user.name,
                    uid     :uid,
                }
                const token = jwt.sign(userToken, hmac.digest('hex'), {expiresIn:'24h'})
                ctx.cookies.set("token", token, {
                    maxAge: 24 * 60 * 1000,
                    httpOnly:true,
                    overwrite:false,
                    domain:'localhost',
                })
                ctx.body = {
                    message:'Login succeed',
                    code:0,
                }
            } else {
                ctx.body = {
                    message:'Wrong password',
                    code: -1
                }
            }
        } else if (pass === null) {
            ctx.body = {
                message:'Unregistered user',
                code:-1
            }
        } else {
            ctx.body = {
                message:'No input password',
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

module.exports = router