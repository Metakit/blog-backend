const db = require("../modules/dbHelper")
const _ = require("lodash")

async function test_dbHelper() {
    let results = await db.query("u_account", ["*"])
    console.log(results)

    results = await db.query("u_account", ["upass", "username"], {"uid":1})
    console.log(results)

    results = await db.query("u_account", ["upass"], {"uid":2})
    console.log(results)

    results = await db.query("u_account", ["upass"], {"uid":1, "username":"222"})
    console.log(results)

    results = await db.query("u_account", "upass, username")
    console.log(results)

    results = await db.query(["u_account"])
}

test_dbHelper()
