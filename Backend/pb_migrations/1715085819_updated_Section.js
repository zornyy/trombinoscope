/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ll554wzn9c1532o")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "csqxhxia",
    "name": "trombino_id",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "5u3vl9u558rybny",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ll554wzn9c1532o")

  // remove
  collection.schema.removeField("csqxhxia")

  return dao.saveCollection(collection)
})
