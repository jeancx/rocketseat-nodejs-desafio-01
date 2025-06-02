var crypto = require("node:crypto");

class Task {
    #id; //Identificador único de cada task
    #title; // Título da task
    #description; //- Descrição detalhada da task
    #completed_at; // Data de quando a task foi concluída. O valor inicial deve ser `null`
    #created_at; // Data de quando a task foi criada.
    #updated_at; // Deve ser sempre alterado para a data de quando a task foi atualizada.

    constructor(data) {
        this.#id = data.id || crypto.randomUUID();
        this.#title = data.title;
        this.#description = data.description;
        this.#completed_at = data.completed_at;
        this.#created_at = data.created_at || new Date().toJSON();
        this.#updated_at = data.updated_at;
    }

    data() {
        return {
            id: this.#id,
            title: this.#title,
            description: this.#description,
            completed_at: this.#completed_at,
            created_at: this.#created_at,
            updated_at: this.#updated_at,
        };
    }

    toggleCompleted() {
        this.#completed_at = this.#completed_at ? null : new Date().toJSON();
        this.#markUpdated();
    }

    setTitle(title) {
        this.#title = title;
        this.#markUpdated();
    }

    setDescription(description) {
        this.#description = description;
        this.#markUpdated();
    }

    #markUpdated() {
        this.#updated_at = new Date().toJSON();
    }
}

module.exports = Task;