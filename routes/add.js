const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const router = require('koa-router')()
const db = require('../modules/dbHelper')


router.post('/api/add', async (ctx)=>{
    const user = ctx.state.user
    const markdown = ctx.request.body
    
    const uid = user.uid
    if (userlist.includes(uid)) {
        const md5 = crypto.createHash('md5')
        const title = markdown.title
        md5.update(title + uid)
        const title_hash = md5.digest('hex')
        const markdown_path = path.join(".", "blogs", title_hash + '.md')
        const in_stream = fs.createWriteStream(markdown_path)
        in_stream.write(markdown_path)
        in_stream.end()
        const timestamp = new Date().getTime()
        const rows = await db.insert("u_blogpath", [user.uid, markdown_path, title, timestamp, timestamp])            
        ctx.body = {
            message:'Succeed',
            code:0,
        }
    }else {
        ctx.body = {
            message:'Invalid user, please relog',
            code:-1,
        }
    }
})

module.exports = router


