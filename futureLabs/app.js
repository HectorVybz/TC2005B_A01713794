const express = require("express");
const path = require("path");
const session = require("express-session");

const mainRoutes = require("./routes/mainRoutes");
const formRoutes = require("./routes/formRoutes");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(session({
    secret: "mi_secreto_super_seguro_lab14",
    resave: false,
    saveUninitialized: false
}));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", mainRoutes);
app.use("/", formRoutes);

app.use((req, res) => {
    res.status(404).render("404");
});

app.listen(PORT, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});