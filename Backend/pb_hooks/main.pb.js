

routerAdd("GET", "/trombino", (c) => {
    const trombino = arrayOf(new DynamicModel({
        "id": "",
        "name": "",
        "description": "",
        "is_archived": false,
        "user_id": ""
    }))

    const record = c.get("authRecord");
    if(!record) return c.json(403, { data: null })

    $app.dao().db()
        .select("*")
        .from("Trombino")
        .where($dbx.exp("user_id = {:id}", { id: record.id }))
        .all(trombino)

    return c.json(200, trombino)
})

onModelBeforeCreate((e) => {
    const record = e.get("authRecord");
    if(!record) return c.json(403, { data: null })
    e.model.tableName()
    if(e.model.is_archived == undefined) e.model.is_archived = false
    e.model.user_id = false
}, "Trombino")

onRecordViewRequest((e) => {
    const sections = arrayOf(new DynamicModel({
        "id": "",
        "name": "",
        "description": "",
        "trombino_id": ""
    }))
    console.log(0)
    console.log(JSON.stringify(e.httpContext))
    $app.dao().db()
        .select("*")
        .from("Section")
        .where($dbx.exp("trombino_id = {:id}", { id: e.record.id }))
        .all(sections)
    e.record.sections = []
    console.log(JSON.stringify(e.record))
}, "Trombino")