import express from "express";
import jwt from "jsonwebtoken";
import { verifyToken, authorizeRoles } from "../middleware/authMiddleware.js";
import fs from "fs";

const router = express.Router();
const SECRET_KEY = "jwt_secret_key";
const users = JSON.parse(fs.readFileSync("backend/users.json"));

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ username: user.username, role: user.role }, SECRET_KEY, { expiresIn: "1h" });
  res.json({ token });
});

router.get("/admin", verifyToken, authorizeRoles("Admin"), (req, res) => {
  res.json({ message: "Welcome Admin!" });
});

router.get("/moderator", verifyToken, authorizeRoles("Moderator", "Admin"), (req, res) => {
  res.json({ message: "Welcome Moderator!" });
});

router.get("/user", verifyToken, authorizeRoles("User", "Moderator", "Admin"), (req, res) => {
  res.json({ message: "Welcome User!" });
});

export default router;