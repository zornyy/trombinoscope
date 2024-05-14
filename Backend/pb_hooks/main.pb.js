$apis.requireRecordAuth(
    routerAdd("GET", "/trombino", (c) => {
        const id = c.get("authRecord").id
        return c.json(200, { data: $app.dao().db().newQuery(`SELECT * FROM Trombino WHERE user_id = ${id}` )})
    }
))