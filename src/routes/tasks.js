var express = require("express");
var router = express.Router();
var Database = require("../utils/database");
var isTestEnv = process.env.NODE_ENV === "test";
var database = new Database(isTestEnv);
var table = "tasks";

router.get("/", function (_req, res) {
    var taskList = database.select(table);

    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(taskList));
});

router.get("/:id", function (req, res) {
    var task = database.select(table, req.params.id);

    if (task === null) {
        res.status(404).send("task not found.");
    }

    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(task));
});

router.post("/", function (req, res) {
    var data = req.body;

    if (!data.title || !data.description) {
        res.status(422).send("title or description missing.");
    }

    var taskList = database.insert(table, data);

    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(taskList));
});

router.put("/:id", function (req, res) {
    var id = req.params.id;
    var data = req.body;

    if (!data.title || !data.description) {
        res.status(422).send("title or description missing.");
    }

    var updatedTask = database.update(table, id, data);

    if (updatedTask === null) {
        res.status(404).send("task not found.");
    }

    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(updatedTask));
});

router.delete("/:id", function (req, res) {
    var id = req.params.id;
    var deleted = database.delete(table, id);

    if (!deleted) {
        res.status(404).send("task not found.");
    }

    res.status(200).send("task deleted.");
});

module.exports = router;
