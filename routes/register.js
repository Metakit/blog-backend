const db = require('../modules/dbHelper')


const router = require('koa')()

router.post('/register', async (ctx) => {
    let user = ctx.body
    if (user.username) {
        const res = await db.query(`SELECT * FROM u_account WHERE username = ${user.username}`)
        if (!res) {
            if (user.userpass) {
                // const res = await db.query(`INSERT INTO u_account VALUES(DEFUALT, )`)
            }
        }
    }
})