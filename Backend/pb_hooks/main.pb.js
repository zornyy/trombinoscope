routerAdd("GET", "/trombino", (c) => {
    if(!request.auth.id) return c.json(403, { data: null })
    return c.json(200, { data: $app.dao().db().newQuery(`SELECT * FROM Trombino WHERE user_id = ${request.auth.id}` )})
})