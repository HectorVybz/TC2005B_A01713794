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

    async saveWithInitialAbility(habilidad) {
        const connection = await db.getConnection();

        try {
            await connection.beginTransaction();

            const [personajeRows] = await connection.execute(
                "CALL sp_guardar_personaje(?, ?, ?, ?)",
                [null, this.nombre, this.img, this.descripcion]
            );
            const personajeId = personajeRows[0][0].id;

            await connection.execute(
                `INSERT INTO habilidades
                (personaje_id, nombre, tipo, descripcion, dano_base, costo_energia, nivel_requerido)
                VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [
                    personajeId,
                    habilidad.nombre,
                    habilidad.tipo,
                    habilidad.descripcion,
                    habilidad.danoBase,
                    habilidad.costoEnergia,
                    habilidad.nivelRequerido
                ]
            );

            await connection.commit();
            return [[{ id: personajeId }], []];
        } catch (error) {
            await connection.rollback();
            throw error;
        } finally {
            connection.release();
        }
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

    static fetchHabilidades(id) {
        return db.execute(
            `SELECT id, nombre, tipo, descripcion, dano_base, costo_energia, nivel_requerido
            FROM habilidades
            WHERE personaje_id = ?
            ORDER BY nivel_requerido, id`,
            [id]
        );
    }

    static fetchAuditoriaHabilidades(id) {
        return db.execute(
            `SELECT accion, detalle, created_at
            FROM auditoria_habilidades
            WHERE personaje_id = ?
            ORDER BY created_at DESC, id DESC
            LIMIT 5`,
            [id]
        );
    }

    static update(id, nombre, img, descripcion) {
        return db.execute(
            "CALL sp_guardar_personaje(?, ?, ?, ?)",
            [id, nombre, img, descripcion]
        ).then(getProcedureRows);
    }
};
