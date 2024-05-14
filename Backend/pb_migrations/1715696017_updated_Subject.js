/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fj4wtltror747g5")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "42tzmpei",
    "name": "image",
    "type": "file",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "mimeTypes": [],
      "thumbs": [],
      "maxSelect": 1,
      "maxSize": 5242880,
      "protected": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("fj4wtltror747g5")

  // remove
  collection.schema.removeField("42tzmpei")

  return dao.saveCollection(collection)
})
