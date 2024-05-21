/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5u3vl9u558rybny")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bgqpsvyo",
    "name": "is_archived",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5u3vl9u558rybny")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "bgqpsvyo",
    "name": "is_archived",
    "type": "bool",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
})
