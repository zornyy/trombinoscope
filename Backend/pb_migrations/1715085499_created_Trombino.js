/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "5u3vl9u558rybny",
    "created": "2024-05-07 12:38:19.128Z",
    "updated": "2024-05-07 12:38:19.128Z",
    "name": "Trombino",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "ouqfvzpo",
        "name": "name",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("5u3vl9u558rybny");

  return dao.deleteCollection(collection);
})
