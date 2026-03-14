const express = require("express");
const path = require("path");

const mainRoutes = require("./routes/mainRoutes");
const formRoutes = require("./routes/formRoutes");

const app = express();
const PORT = 3000;

// forms
app.use(express.urlencoded({ extended: false }));

// archivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// configurar EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// rutas
app.use("/", mainRoutes);
app.use("/", formRoutes);

// 404
app.use((req, res) => {
    res.status(404).render("404");
});

app.listen(PORT, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});