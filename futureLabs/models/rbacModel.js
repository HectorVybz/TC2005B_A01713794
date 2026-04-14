const db = require("../util/database");

module.exports = class RbacModel {
    static findRoleByName(roleName) {
        return db.execute(
            "SELECT * FROM roles WHERE nombre = ?",
            [roleName]
        );
    }

    static findRolesByUserId(userId) {
        return db.execute(
            `SELECT r.id, r.nombre, r.descripcion
             FROM roles r
             INNER JOIN usuario_roles ur ON ur.rol_id = r.id
             WHERE ur.usuario_id = ?
             ORDER BY r.nombre`,
            [userId]
        );
    }

    static findPermissionsByUserId(userId) {
        return db.execute(
            `SELECT DISTINCT p.id, p.clave, p.descripcion
             FROM permisos p
             INNER JOIN rol_permisos rp ON rp.permiso_id = p.id
             INNER JOIN usuario_roles ur ON ur.rol_id = rp.rol_id
             WHERE ur.usuario_id = ?
             ORDER BY p.clave`,
            [userId]
        );
    }

    static fetchAllRoles() {
        return db.execute(
            "SELECT * FROM roles ORDER BY id"
        );
    }

    static fetchUsersWithAccessData() {
        return db.execute(
            `SELECT
                u.id,
                u.username,
                u.created_at,
                COALESCE(GROUP_CONCAT(DISTINCT r.nombre ORDER BY r.nombre SEPARATOR ', '), 'Sin roles') AS roles,
                COALESCE(GROUP_CONCAT(DISTINCT p.clave ORDER BY p.clave SEPARATOR ', '), 'Sin permisos') AS permisos
             FROM usuarios u
             LEFT JOIN usuario_roles ur ON ur.usuario_id = u.id
             LEFT JOIN roles r ON r.id = ur.rol_id
             LEFT JOIN rol_permisos rp ON rp.rol_id = r.id
             LEFT JOIN permisos p ON p.id = rp.permiso_id
             GROUP BY u.id, u.username, u.created_at
             ORDER BY u.id`
        );
    }

    static fetchUserRoleLinks() {
        return db.execute(
            "SELECT usuario_id, rol_id FROM usuario_roles ORDER BY usuario_id, rol_id"
        );
    }

    static countUsersWithRole(roleName) {
        return db.execute(
            `SELECT COUNT(DISTINCT ur.usuario_id) AS total
             FROM usuario_roles ur
             INNER JOIN roles r ON r.id = ur.rol_id
             WHERE r.nombre = ?`,
            [roleName]
        );
    }

    static updateUserRoles(userId, roleIds) {
        return db.getConnection()
            .then(connection => {
                return connection.beginTransaction()
                    .then(() => connection.execute(
                        "DELETE FROM usuario_roles WHERE usuario_id = ?",
                        [userId]
                    ))
                    .then(() => {
                        if (roleIds.length === 0) {
                            return Promise.resolve();
                        }

                        const values = roleIds.map(roleId => [userId, roleId]);
                        return connection.query(
                            "INSERT INTO usuario_roles (usuario_id, rol_id) VALUES ?",
                            [values]
                        );
                    })
                    .then(() => connection.commit())
                    .then(() => {
                        connection.release();
                    })
                    .catch(err => {
                        return connection.rollback()
                            .catch(() => {})
                            .then(() => {
                                connection.release();
                                throw err;
                            });
                    });
            });
    }

    static assignRoleToUser(userId, roleName) {
        return this.findRoleByName(roleName)
            .then(([rows]) => {
                if (rows.length === 0) {
                    throw new Error(`No existe el rol ${roleName} en la base de datos.`);
                }

                const roleId = rows[0].id;

                return db.execute(
                    "INSERT INTO usuario_roles (usuario_id, rol_id) VALUES (?, ?)",
                    [userId, roleId]
                );
            });
    }
};
