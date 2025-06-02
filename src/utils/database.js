var fs = require("fs");

class Database {
    #jsonPath;
    #database;

    constructor(isTestEnv) {
        this.#jsonPath = isTestEnv
            ? "../../database-test.json"
            : "../../database.json";
        this.#database = JSON.parse(fs.readFileSync(this.#jsonPath));
    }

    #persist() {
        fs.writeFile(this.#jsonPath, this.#database, "utf8");
    }

    select(table, id = null) {
        var list = this.#database[table];

        if (id) {
            return list.find((item) => {
                item.id === id;
            });
        }

        return list;
    }

    insert(table, data) {
        this.#database[table].push(data);
        this.#persist();
    }

    update(table, id, data) {
        for (let index = 0; index < this.#database[table].length; index++) {
            if (this.#database[table][index].id === id) {
                this.#database[table][index] = data;

                this.#persist();

                return this.#database[table][index];
            }
        }

        return null;
    }

    delete(table, id) {
        var deteled = false;
        var filteredList = this.#database[table].filter(
            (item) => item.id !== id
        );

        if (this.#database[table].length > filteredList.length) {
            deteled = true;
            this.#database[table] = filteredList;
            this.#persist();
        }

        return deteled;
    }
}

module.exports = Database;
