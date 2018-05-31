const crypto = require('crypto')

const db = require('../modules/dbHelper')


const router = require('koa-router')()

router.post('/api/register', async (ctx) => {

    let user = ctx.request.body
    if (user.username) {
        const res = await db.query("u_account", "uid", {"username":user.username})
        if (!res) {
            if (user.userpass) {
                const md5 = crypto.createHash('md5')
                let pass = md5.update(user.userpass).digest('hex')
                const res = await db.insert("u_account", ["DEFAULT", pass, user.username])
                ctx.body = {
                    message:'Register success',
                    code:0,
                }
            }else {
                ctx.body = {
                    message:'No valid password',
                    code:-1,
                }
            }
        } else {
            ctx.body = {
                message:'Username already exist',
                code:-1,
            }
        }
    } else {
        ctx.body = {
            message:'No valid username',
            code:-1,
        }
    }
})

module.exports = router