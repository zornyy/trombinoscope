/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("p81yu5dq066ffqo");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "p81yu5dq066ffqo",
    "created": "2024-05-07 12:45:26.376Z",
    "updated": "2024-05-14 14:00:33.262Z",
    "name": "Picture",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "btnkwvpa",
        "name": "is_active",
        "type": "bool",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
      },
      {
        "system": false,
        "id": "pry8tc7j",
        "name": "subject_id",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "fj4wtltror747g5",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
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
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": "id = @request.auth.id",
    "updateRule": "  id = @request.auth.id",
    "deleteRule": "id = @request.auth.id",
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
