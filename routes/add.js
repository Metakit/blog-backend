const router = require('koa-router')()
const getUserId = require('../modules/dbHelper').getUserId

router.post('/add', async (ctx)=>{
    let user = ctx.state.user
    let uid = await getUserId(user.username)
})