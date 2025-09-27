const express = require("express");
const SqlService = require("../../services/sqlService");
const cipher = require("../utils/cipher");


const router = express.Router();

// ========== Register ==========
router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send("Missing fields.");
  }

  const db = new SqlService();
  const tableName = "user";
  try {
    await db.connectToDb();

    // ciframos la contraseña con nuestro método
    const encryptedPassword = cipher.encrypt(password);

    await db.query(
      `INSERT INTO ${tableName} (username, password) VALUES (?, ?)`,
      [username, encryptedPassword]
    );
    res.status(200).send("User registered successfully.");
  } catch (err) {
    console.error("SQL error:", err.sqlMessage || err);
    res.status(500).send("Error registering user.");
  } finally {
    await db.closeConnection();
  }
});

// ========== Login ==========
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send("Missing fields.");
  }

  const db = new SqlService();
  const tableName = "user";
  try {
    await db.connectToDb();

    // ciframos la contraseña ingresada y la comparamos con la almacenada
    const encryptedInput = cipher.encrypt(password);

    const result = await db.query(
      `SELECT * FROM ${tableName} WHERE username = ? AND password = ?`,
      [username, encryptedInput]
    );

    if (result.length === 0) {
      res.status(401).send("Invalid username or password.");
    } else {
      res.status(200).send(`Welcome, ${result[0].username}!`);
    }
  } catch (err) {
    console.error("SQL error:", err.sqlMessage || err);
    res.status(500).send("Error during login.");
  } finally {
    await db.closeConnection();
  }
});

module.exports = router;
