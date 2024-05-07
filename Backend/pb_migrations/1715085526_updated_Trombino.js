/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("5u3vl9u558rybny")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rvkvliya",
    "name": "description",
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

  // add
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

  // remove
  collection.schema.removeField("rvkvliya")

  // remove
  collection.schema.removeField("bgqpsvyo")

  return dao.saveCollection(collection)
})
