// routes/employees.js
const express = require("express");
const router = express.Router();
const {
  // Team controllers
  createTeam,
  getAllTeams,
  updateTeam,
  deleteTeam,
  
  // Employee controllers
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  getEmployeeStats
} = require("../controllers/employeeController");

// ==================== TEAM ROUTES ====================

// Create a new team
router.post("/teams", createTeam);

// Get all teams
router.get("/teams", getAllTeams);

// Update team
router.put("/teams/:id", updateTeam);

// Delete team
router.delete("/teams/:id", deleteTeam);

// ==================== EMPLOYEE ROUTES ====================

// Create a new employee
router.post("/", createEmployee);

// Get all employees with filtering
router.get("/", getAllEmployees);

// Get employee by ID
router.get("/:id", getEmployeeById);

// Update employee
router.put("/:id", updateEmployee);

// Delete employee
router.delete("/:id", deleteEmployee);

// Get employee statistics
router.get("/stats/summary", getEmployeeStats);

module.exports = router;