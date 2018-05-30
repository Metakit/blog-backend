const router = require('koa-router')()
const db = require('../modules/dbHelper')
const getUserId = require('../modules/dbHelper').getUserId

router.post('/add', async (ctx)=>{
    let user = ctx.state.user
})