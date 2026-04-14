const db = require("../util/database");

module.exports = class PersonajeModel {
    constructor(nombre, img, descripcion) {
        this.nombre = nombre;
        this.img = img;
        this.descripcion = descripcion;
    }

    save() {
        return db.execute(
            "INSERT INTO personajes (nombre, img, descripcion) VALUES (?, ?, ?)",
            [this.nombre, this.img, this.descripcion]
        );
    }

    static fetchAll() {
        return db.execute("SELECT * FROM personajes");
    }

    static fetchOne(id) {
        return db.execute("SELECT * FROM personajes WHERE id = ?", [id]);
    }

    static update(id, nombre, img, descripcion) {
        return db.execute(
            "UPDATE personajes SET nombre = ?, img = ?, descripcion = ? WHERE id = ?",
            [nombre, img, descripcion, id]
        );
    }
};