/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5u3vl9u558rybny")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "2yyabjss",
    "name": "user_id",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5u3vl9u558rybny")

  // remove
  collection.schema.removeField("2yyabjss")

  return dao.saveCollection(collection)
})
