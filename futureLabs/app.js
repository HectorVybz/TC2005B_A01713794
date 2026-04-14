const express = require("express");
const path = require("path");
const session = require("express-session");
const csrf = require("csurf");

const authRoutes = require("./routes/authRoutes");
const mainRoutes = require("./routes/mainRoutes");
const formRoutes = require("./routes/formRoutes");
const rbacRoutes = require("./routes/rbacRoutes");

const app = express();
const PORT = 3000;
const csrfProtection = csrf();

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
    secret: process.env.SESSION_SECRET || "mi_secreto_super_seguro_lab18",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true
    }
}));

app.use(csrfProtection);
app.use((req, res, next) => {
    const userRoles = req.session.user?.roles || [];
    const userPermissions = req.session.user?.permissions || [];

    res.locals.isAuthenticated = req.session.isLoggedIn || false;
    res.locals.authUser = req.session.user || null;
    res.locals.userRoles = userRoles;
    res.locals.userPermissions = userPermissions;
    res.locals.hasRole = (role) => userRoles.includes(role);
    res.locals.hasPermission = (permission) => userPermissions.includes(permission);
    res.locals.csrfToken = req.csrfToken();
    next();
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", authRoutes);
app.use("/", mainRoutes);
app.use("/", formRoutes);
app.use("/", rbacRoutes);

app.use((error, req, res, next) => {
    if (error.code === "EBADCSRFTOKEN") {
        const userRoles = req.session?.user?.roles || [];
        const userPermissions = req.session?.user?.permissions || [];
        res.locals.isAuthenticated = req.session?.isLoggedIn || false;
        res.locals.authUser = req.session?.user || null;
        res.locals.userRoles = userRoles;
        res.locals.userPermissions = userPermissions;
        res.locals.hasRole = (role) => userRoles.includes(role);
        res.locals.hasPermission = (permission) => userPermissions.includes(permission);
        res.locals.csrfToken = "";
        return res.status(403).render("403", {
            errorMessage: "El token CSRF es inválido o la sesión expiró. Recarga la página e intenta enviar el formulario otra vez."
        });
    }

    return next(error);
});

app.use((req, res) => {
    res.status(404).render("404");
});

app.listen(PORT, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});
