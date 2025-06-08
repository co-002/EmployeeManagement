import express from "express";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import {
  createEmployee,
  deleteEmployee,
  getAllEmployees,
  updateEmployee,
} from "../controllers/employee.js";

const router = express.Router();

router.post("/createEmp", isAuthenticated, createEmployee);
router.get("/getAllEmp", isAuthenticated, getAllEmployees);
router.put("/updateEmp/:id", isAuthenticated, updateEmployee);
router.delete("/deleteEmp/:id", isAuthenticated, deleteEmployee);

export default router;
