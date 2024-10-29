// server/routes/authRoutes.js
const express = require("express");
const { signup, login } = require("../controllers/authController");
const router = express.Router();
router.post("/signup", signup);
router.post("/login", login);
module.exports = router;

todoRoutes.js 
// server/routes/todoRoutes.js
const express = require("express");
const { addTask, getTasks, deleteTask, updateTask } = require("../controllers/todoController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();
router.post("/", authMiddleware, addTask);
router.get("/", authMiddleware, getTasks);
router.delete("/:id", authMiddleware, deleteTask);
router.put("/:id", authMiddleware, updateTask);
module.exports = router;