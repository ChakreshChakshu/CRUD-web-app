import express from "express";
import {
  createUser,
  getUsers,
  getUserById,      // 🔥 ADD THIS
  updateUser,
  deleteUser,
  exportUsersToCSV,
  searchUsers
} from "../controllers/User.controller.js";

const router = express.Router();


router.get("/search", searchUsers);
router.get("/export/csv", exportUsersToCSV);

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUserById);   
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
