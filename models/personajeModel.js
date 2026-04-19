const db = require("../util/database");

const getProcedureRows = ([rows, fieldData]) => {
    return [rows[0] || [], fieldData];
};

module.exports = class PersonajeModel {
    constructor(nombre, img, descripcion) {
        this.nombre = nombre;
        this.img = img;
        this.descripcion = descripcion;
    }

    save() {
        return db.execute(
            "CALL sp_guardar_personaje(?, ?, ?, ?)",
            [null, this.nombre, this.img, this.descripcion]
        ).then(getProcedureRows);
    }

    static fetchAll() {
        return db.execute("CALL sp_listar_personajes()")
            .then(getProcedureRows);
    }

    static fetchOne(id) {
        return db.execute("CALL sp_obtener_personaje(?)", [id])
            .then(getProcedureRows);
    }

    static searchByName(termino) {
        return db.execute("CALL sp_buscar_personajes(?)", [termino])
            .then(getProcedureRows);
    }

    static update(id, nombre, img, descripcion) {
        return db.execute(
            "CALL sp_guardar_personaje(?, ?, ?, ?)",
            [id, nombre, img, descripcion]
        ).then(getProcedureRows);
    }
};
