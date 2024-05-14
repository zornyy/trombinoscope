/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("p81yu5dq066ffqo")

  // remove
  collection.schema.removeField("dvlqomyk")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "c4malimi",
    "name": "picture",
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
  const collection = dao.findCollectionByNameOrId("p81yu5dq066ffqo")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dvlqomyk",
    "name": "url",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // remove
  collection.schema.removeField("c4malimi")

  return dao.saveCollection(collection)
})
