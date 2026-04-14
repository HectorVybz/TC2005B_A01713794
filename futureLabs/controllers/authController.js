const bcrypt = require("bcryptjs");

const RbacModel = require("../models/rbacModel");
const UserModel = require("../models/userModel");

const clearAuthMessages = (req) => {
    const authError = req.session.authError || null;
    const authSuccess = req.session.authSuccess || null;
    const oldInput = req.session.oldInput || {};

    req.session.authError = null;
    req.session.authSuccess = null;
    req.session.oldInput = null;

    return { authError, authSuccess, oldInput };
};

const redirectWithMessage = (req, res, path, type, message, oldInput = {}) => {
    req.session[type] = message;
    req.session.oldInput = oldInput;

    return req.session.save(() => {
        res.redirect(path);
    });
};

exports.getLogin = (req, res) => {
    if (req.session.isLoggedIn) {
        return res.redirect("/inicio");
    }

    const { authError, authSuccess, oldInput } = clearAuthMessages(req);

    return res.render("auth", {
        pageTitle: "Iniciar sesión",
        isNew: false,
        errorMessage: authError,
        successMessage: authSuccess,
        oldInput
    });
};

exports.getSignup = (req, res) => {
    if (req.session.isLoggedIn) {
        return res.redirect("/inicio");
    }

    const { authError, authSuccess, oldInput } = clearAuthMessages(req);

    return res.render("auth", {
        pageTitle: "Registro de usuario",
        isNew: true,
        errorMessage: authError,
        successMessage: authSuccess,
        oldInput
    });
};

exports.postSignup = (req, res) => {
    const username = req.body.username ? req.body.username.trim() : "";
    const password = req.body.password ? req.body.password.trim() : "";
    const confirmPassword = req.body.confirmPassword ? req.body.confirmPassword.trim() : "";

    if (!username || !password || !confirmPassword) {
        return redirectWithMessage(
            req,
            res,
            "/users/signup",
            "authError",
            "Completa todos los campos para registrar un usuario.",
            { username }
        );
    }

    if (password.length < 6) {
        return redirectWithMessage(
            req,
            res,
            "/users/signup",
            "authError",
            "La contraseña debe tener al menos 6 caracteres.",
            { username }
        );
    }

    if (password !== confirmPassword) {
        return redirectWithMessage(
            req,
            res,
            "/users/signup",
            "authError",
            "Las contraseñas no coinciden.",
            { username }
        );
    }

    return UserModel.findByUsername(username)
        .then(([rows]) => {
            if (rows.length > 0) {
                return redirectWithMessage(
                    req,
                    res,
                    "/users/signup",
                    "authError",
                    "Ese nombre de usuario ya existe. Intenta con otro.",
                    { username }
                );
            }

            const user = new UserModel(username, password);

            return UserModel.countAll()
                .then(([countRows]) => {
                    const totalUsers = countRows[0].total;
                    const defaultRole = totalUsers === 0 ? "admin" : "viewer";

                    return user.save()
                        .then(([result]) => {
                            return RbacModel.assignRoleToUser(result.insertId, defaultRole)
                                .then(() => {
                                    req.session.authSuccess = `Usuario registrado correctamente. Rol inicial asignado: ${defaultRole}. Ahora puedes iniciar sesión.`;
                                    req.session.oldInput = { username };

                                    return req.session.save(() => {
                                        res.redirect("/users/login");
                                    });
                                });
                        });
                });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("No se pudo registrar el usuario.");
        });
};

exports.postLogin = (req, res) => {
    const username = req.body.username ? req.body.username.trim() : "";
    const password = req.body.password ? req.body.password.trim() : "";

    if (!username || !password) {
        return redirectWithMessage(
            req,
            res,
            "/users/login",
            "authError",
            "Ingresa tu usuario y contraseña.",
            { username }
        );
    }

    return UserModel.findByUsername(username)
        .then(([rows]) => {
            if (rows.length === 0) {
                return redirectWithMessage(
                    req,
                    res,
                    "/users/login",
                    "authError",
                    "Usuario o contraseña incorrectos.",
                    { username }
                );
            }

            const user = rows[0];

            return bcrypt.compare(password, user.password)
                .then(doMatch => {
                    if (!doMatch) {
                        return redirectWithMessage(
                            req,
                            res,
                            "/users/login",
                            "authError",
                            "Usuario o contraseña incorrectos.",
                            { username }
                        );
                    }

                    return Promise.all([
                        RbacModel.findRolesByUserId(user.id),
                        RbacModel.findPermissionsByUserId(user.id)
                    ])
                        .then(([[roleRows], [permissionRows]]) => {
                            req.session.isLoggedIn = true;
                            req.session.user = {
                                id: user.id,
                                username: user.username,
                                roles: roleRows.map(role => role.nombre),
                                permissions: permissionRows.map(permission => permission.clave)
                            };
                            req.session.nombreUsuario = user.username;

                            return req.session.save(() => {
                                res.redirect("/inicio");
                            });
                        });
                });
        })
        .catch(err => {
            console.log(err);
            res.status(500).send("No se pudo iniciar sesión.");
        });
};

exports.postLogout = (req, res) => {
    req.session.destroy(() => {
        res.clearCookie("connect.sid");
        res.setHeader("Set-Cookie", "personajeFavorito=; Max-Age=0; HttpOnly");
        res.redirect("/inicio");
    });
};
