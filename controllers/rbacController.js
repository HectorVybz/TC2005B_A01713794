const RbacModel = require("../models/rbacModel");

const pullRbacMessages = (req) => {
    const successMessage = req.session.rbacSuccess || null;
    const errorMessage = req.session.rbacError || null;

    req.session.rbacSuccess = null;
    req.session.rbacError = null;

    return { successMessage, errorMessage };
};

const storeRbacMessage = (req, res, type, message) => {
    req.session[type] = message;

    return req.session.save(() => {
        res.redirect("/admin/rbac");
    });
};

const refreshSessionAccess = (req, userId) => {
    if (!req.session.user || req.session.user.id !== userId) {
        return Promise.resolve();
    }

    return Promise.all([
        RbacModel.findRolesByUserId(userId),
        RbacModel.findPermissionsByUserId(userId)
    ])
        .then(([[roleRows], [permissionRows]]) => {
            req.session.user.roles = roleRows.map(role => role.nombre);
            req.session.user.permissions = permissionRows.map(permission => permission.clave);
        });
};

exports.getPanel = (req, res) => {
    const { successMessage, errorMessage } = pullRbacMessages(req);

    return Promise.all([
        RbacModel.fetchAllRoles(),
        RbacModel.fetchUsersWithAccessData(),
        RbacModel.fetchUserRoleLinks()
    ])
        .then(([[roles], [users], [roleLinks]]) => {
            const roleMap = {};

            roleLinks.forEach(link => {
                if (!roleMap[link.usuario_id]) {
                    roleMap[link.usuario_id] = [];
                }

                roleMap[link.usuario_id].push(link.rol_id);
            });

            const usersWithRoleIds = users.map(user => {
                return {
                    ...user,
                    roleIds: roleMap[user.id] || []
                };
            });

            res.render("rbac", {
                roles,
                users: usersWithRoleIds,
                successMessage,
                errorMessage
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("No se pudo cargar el panel RBAC.");
        });
};

exports.postUpdateUserRoles = (req, res) => {
    const userId = Number(req.body.userId);
    const incomingRoles = req.body.roleIds || [];
    const roleIds = (Array.isArray(incomingRoles) ? incomingRoles : [incomingRoles])
        .filter(Boolean)
        .map(roleId => Number(roleId));

    if (!Number.isInteger(userId) || userId <= 0) {
        return storeRbacMessage(req, res, "rbacError", "No se recibió un usuario válido para actualizar roles.");
    }

    return Promise.all([
        RbacModel.fetchAllRoles(),
        RbacModel.findRolesByUserId(userId),
        RbacModel.countUsersWithRole("admin")
    ])
        .then(([[roles], [currentRoles], [adminCountRows]]) => {
            const validRoleIds = roles.map(role => role.id);
            const invalidRole = roleIds.find(roleId => !validRoleIds.includes(roleId));

            if (invalidRole) {
                return storeRbacMessage(req, res, "rbacError", "Se intentó asignar un rol que no existe.");
            }

            const currentRoleNames = currentRoles.map(role => role.nombre);
            const adminRole = roles.find(role => role.nombre === "admin");
            const adminCount = adminCountRows[0].total;
            const keepsAdmin = adminRole ? roleIds.includes(adminRole.id) : false;

            if (currentRoleNames.includes("admin") && !keepsAdmin && adminCount <= 1) {
                return storeRbacMessage(req, res, "rbacError", "No puedes quitar el último rol de administrador del sistema.");
            }

            return RbacModel.updateUserRoles(userId, roleIds)
                .then(() => refreshSessionAccess(req, userId))
                .then(() => {
                    req.session.rbacSuccess = "Los roles del usuario se actualizaron correctamente.";
                    return req.session.save(() => {
                        res.redirect("/admin/rbac");
                    });
                });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("No se pudieron actualizar los roles del usuario.");
        });
};
