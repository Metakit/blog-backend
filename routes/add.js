const fs = require('fs')
const path = require('path')
const crypto = require('crypto')
const router = require('koa-router')()
const db = require('../modules/dbHelper')

const md5 = crypto.createHash('md5')

router.post('/add', async (ctx)=>{
    const user = ctx.state.user
    const markdown = ctx.request.body
    
    const uid = user.uid
    if (userlist.includes(uid)) {
        const title = markdown.title
        md5.update(title + uid)
        const title_hash = md5.digest('hex')
        const markdown_path = path.join(__dirname, "blogs", title_hash + '.md')
        fs.createWriteStream(markdown_path).write(markdown.content)
        const timestamp = new Date().getTime()
        const rows = db.insert("u_blogpath", [user.uid, markdown_path, title, timestamp, timestamp])
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


