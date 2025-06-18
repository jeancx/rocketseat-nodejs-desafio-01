process.env.NODE_ENV = "test";

var chai = require("chai");
var Database = require("../../src/utils/database");
var fs = require("node:fs");
var jsonPath = "./test-database.json";

describe("about database", () => {
    var database = null;
    var table = 'tasks';

    after(() => {
        fs.unlink(jsonPath, () => {});
    });

    it("creates json file", async () => {
        chai.expect(fs.existsSync(jsonPath)).to.be.false;

        database = await new Database(jsonPath);

        chai.expect(fs.existsSync(jsonPath)).to.be.true;
    });

    describe("#select", async () => {
        beforeEach(async () => {
            database = await new Database(jsonPath);
            database.insert(table, { title: "Task 1" });
            database.insert(table, { title: "Task 2" });
        })

        it("returns all items", () => {
            chai.expect(database.select(table)).to.have.length(2);
        });
    });
});
