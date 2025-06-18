process.env.NODE_ENV = "test";

var chai = require("chai");
var Database = require("../../src/utils/database");
var fs = require("node:fs");
var jsonPath = "./test-database.json";

describe("about Database", () => {
    var db = null;
    var table = "tasks";

    afterEach(() => {
        db = null;
        fs.unlink(jsonPath, () => {});
    });

    it("creates a json file when initialized", async () => {
        chai.expect(fs.existsSync(jsonPath)).to.be.false;

        db = await new Database(jsonPath);

        chai.expect(fs.existsSync(jsonPath)).to.be.true;
    });

    it("uses existing json file when initialized", async () => {
        db = await new Database(jsonPath);
        chai.expect(fs.existsSync(jsonPath)).to.be.true;

        db.insert(table, { title: "Task 1" });
        chai.expect(db.select("tasks")).to.have.length(1);

        db = null;
        chai.expect(fs.existsSync(jsonPath)).to.be.true;
        db = await new Database(jsonPath);
        chai.expect(fs.existsSync(jsonPath)).to.be.true;
        chai.expect(db.select("tasks")).to.have.length(1);
    });

    describe("#select", async () => {
        beforeEach(async () => {
            db = await new Database(jsonPath);
            db.insert(table, { title: "Task 1" });
            db.insert(table, { title: "Task 2" });
        });

        it("returns all items", () => {
            chai.expect(db.select(table)).to.have.length(2);
        });
    });

    describe("#insert", () => {
        beforeEach(async () => {
            db = await new Database(jsonPath);
        });

        it("adds any data to the specified table in the database", async () => {
            chai.expect(db.select("tasks")).to.have.length(0);

            await db.insert("tasks", { title: "New Task" });
            chai.expect(db.select("tasks")).to.have.length(1);

            await db.insert("tasks", { title: "New Task 2" });
            chai.expect(db.select("tasks")).to.have.length(2);
        });
    });

    describe("#update", () => {
        beforeEach(async () => {
            db = await new Database(jsonPath);
            db.insert(table, { title: "Task 1" });
        });

        it("updates data to the specified table in the database", async () => {
            var results = db.select("tasks");
            chai.expect(results[0].title).to.be.eq("Task 1");

            await db.update("tasks", results[0].id, {
                title: "Task 1 Updated",
            });

            results = db.select("tasks");
            chai.expect(results[0].title).to.be.eq("Task 1 Updated");
        });
    });
});
