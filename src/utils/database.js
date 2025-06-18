var fs = require("node:fs");

class Database {
    #jsonPath;
    #database = {};

    constructor(jsonPath) {
        this.#jsonPath = jsonPath ? jsonPath : "../../database.json";
        console.log("jsonPath", this.#jsonPath);

        if (!fs.existsSync(this.#jsonPath)) {
            this.#persist();
        }
        var data = fs.readFileSync(this.#jsonPath).toString();
        this.#database = JSON.parse(data);
    }

    async #persist() {
        await fs.writeFileSync(this.#jsonPath, JSON.stringify(this.#database));
    }

    #startTable(table) {
        if (!(table in this.#database)) {
            this.#database[table] = [];
        }
    }

    select(table, id = null) {
        this.#startTable(table);
        var list = this.#database[table];

        if (id) {
            return list.find((item) => {
                item.id === id;
            });
        }

        return list;
    }

    insert(table, data) {
        this.#startTable(table);

        this.#database[table].push(data);

        this.#persist();
    }

    update(table, id, data) {
        this.#startTable(table);

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
        this.#startTable(table);

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
