module.exports = (permission) => {
    return (req, res, next) => {
        if (!req.session.isLoggedIn) {
            return res.redirect("/users/login");
        }

        const userPermissions = req.session.user?.permissions || [];

        if (!userPermissions.includes(permission)) {
            return res.status(403).render("403", {
                errorMessage: `No tienes permiso para realizar esta acción. Permiso requerido: ${permission}.`
            });
        }

        return next();
    };
};
