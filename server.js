const express = require("express");
const path = require("path");
const sqlRoutes = require("./routes/mysql/sqlRoutes"); // tu router

const app = express();
const port = 3000;

// ========== Middlewares ==========
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// ========== Rutas ==========
app.use("/sql", sqlRoutes); // <- todas las rutas de login/register van con /sql/register y /sql/login

// ========== Iniciar servidor ==========
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
