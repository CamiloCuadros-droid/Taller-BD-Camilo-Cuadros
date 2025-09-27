const express = require("express");
const path = require("path");
const sqlRoutes = require("./routes/mysql/sqlRoutes");

const app = express();
const port = 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


app.use("/sql", sqlRoutes); 


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
