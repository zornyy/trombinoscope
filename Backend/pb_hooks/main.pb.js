

routerAdd("GET", "/trombino", (c) => {
    const trombino = arrayOf(new DynamicModel({
        "id": "",
        "name": "",
        "description": "",
        "is_archived": false,
        "user_id": ""
    }))

    const record = c.get("authRecord");
    if (!record) return c.json(403, { data: null })

    $app.dao().db()
        .select("*")
        .from("Trombino")
        .where($dbx.exp("user_id = {:id}", { id: record.id }))
        .all(trombino)

    return c.json(200, trombino)
})

routerAdd("GET", "/trombino/:token", (c) => {
    let token = c.pathParam("token")

    const link = $app.dao().findRecordsByExpr("Link",
        $dbx.exp("url = {:token}", { "token": token })
    )[0]
    if (!link) return c.json(404, { data: null })
    const trombino = $app.dao().findRecordById("Trombino", link.get("trombino_id"))
    trombino.withUnknownData(true)
    const sections = $app.dao().findRecordsByExpr("Section",
        $dbx.exp("trombino_id = {:id}", { "id": trombino.getId() })
    )
    let subjects = []
    for (const x of sections) {
        x.withUnknownData(true)
        subjects = $app.dao().findRecordsByExpr("Subject",
            $dbx.exp("section_id = {:id}", { "id": x.getId() })
        )
        x.set("subjects", subjects)
    }
    trombino.set("sections", sections)

    return c.json(200, trombino)
})

onRecordBeforeCreateRequest((e) => {
    const info = $apis.requestInfo(e.httpContext);
    if (!info.authRecord && !info.admin) return e.json(403, { data: null })
    if (e.record.get("is_archived") == undefined) e.record.set("is_archived", false)
    if (!info.admin) e.record.set("user_id", info.authRecord.getId())
}, "Trombino")

onRecordViewRequest((e) => {

    e.record.withUnknownData(true)
    const sections = $app.dao().findRecordsByExpr("Section",
        $dbx.exp("trombino_id = {:id}", { "id": e.record.getId() })
    )

    let subjects = []
    for (const x of sections) {
        x.withUnknownData(true)
        subjects = $app.dao().findRecordsByExpr("Subject",
            $dbx.exp("section_id = {:id}", { "id": x.getId() })
        )
        x.set("subjects", subjects)
    }
    e.record.set("sections", sections)
}, "Trombino")