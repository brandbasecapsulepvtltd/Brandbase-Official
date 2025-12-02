// controllers/employeeController.js
const { Employee, Team } = require("../models/Employee");

// ==================== TEAM CONTROLLERS ====================

// Create a new team
const createTeam = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name || name.trim() === '') {
      return res.status(400).json({
        success: false,
        message: "Team name is required"
      });
    }

    // Check if team already exists
    const existingTeam = await Team.findOne({ 
      name: name.trim().toUpperCase() 
    });

    if (existingTeam) {
      return res.status(400).json({
        success: false,
        message: "Team name already exists"
      });
    }

    const team = new Team({
      name: name.trim().toUpperCase(),
      description: description?.trim() || ""
    });

    await team.save();

    res.status(201).json({
      success: true,
      message: "Team created successfully",
      data: team
    });
  } catch (error) {
    console.error("Error creating team:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

// Get all teams
const getAllTeams = async (req, res) => {
  try {
    const { isActive } = req.query;
    
    let filter = {};
    if (isActive !== undefined) {
      filter.isActive = isActive === 'true';
    }

    const teams = await Team.find(filter)
      .sort({ name: 1 })
      .select('-__v');

    res.status(200).json({
      success: true,
      data: teams
    });
  } catch (error) {
    console.error("Error fetching teams:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

// Update team
const updateTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, isActive } = req.body;

    const team = await Team.findById(id);
    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found"
      });
    }

    // Check if new name already exists (if name is being updated)
    if (name && name.trim() !== team.name) {
      const existingTeam = await Team.findOne({ 
        name: name.trim().toUpperCase(),
        _id: { $ne: id }
      });

      if (existingTeam) {
        return res.status(400).json({
          success: false,
          message: "Team name already exists"
        });
      }
      team.name = name.trim().toUpperCase();
    }

    if (description !== undefined) team.description = description.trim();
    if (isActive !== undefined) team.isActive = isActive;

    await team.save();

    res.status(200).json({
      success: true,
      message: "Team updated successfully",
      data: team
    });
  } catch (error) {
    console.error("Error updating team:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

// Delete team (soft delete)
const deleteTeam = async (req, res) => {
  try {
    const { id } = req.params;

    const team = await Team.findById(id);
    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found"
      });
    }

    // Check if any employees are assigned to this team
    const employeesCount = await Employee.countDocuments({ 
      team: team.name, 
      isActive: true 
    });

    if (employeesCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete team. There are ${employeesCount} employees assigned to this team.`
      });
    }

    // Soft delete by setting isActive to false
    team.isActive = false;
    await team.save();

    res.status(200).json({
      success: true,
      message: "Team deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting team:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

// ==================== EMPLOYEE CONTROLLERS ====================

// Create a new employee
const createEmployee = async (req, res) => {
  try {
    const {
      team,
      firstName,
      lastName,
      email,
      contactNumber,
      designation,
      isRecommended,
      specialization,
      experience,
      bio,
      profileImage
    } = req.body;

    // Validate required fields
    if (!team || !firstName || !lastName || !email || !contactNumber || !designation) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided"
      });
    }

    // Check if team exists and is active
    const teamExists = await Team.findOne({ 
      name: team.toUpperCase(), 
      isActive: true 
    });
    
    if (!teamExists) {
      return res.status(400).json({
        success: false,
        message: "Selected team does not exist or is inactive"
      });
    }

    // Check if email already exists
    const existingEmployee = await Employee.findOne({ 
      email: email.toLowerCase().trim() 
    });

    if (existingEmployee) {
      return res.status(400).json({
        success: false,
        message: "Employee with this email already exists"
      });
    }

    const employee = new Employee({
      team: team.toUpperCase(),
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.toLowerCase().trim(),
      contactNumber: contactNumber.trim(),
      designation: designation.trim(),
      isRecommended: isRecommended || false,
      specialization: specialization?.trim() || "",
      experience: experience?.trim() || "",
      bio: bio?.trim() || "",
      profileImage: profileImage || ""
    });

    await employee.save();

    res.status(201).json({
      success: true,
      message: "Employee created successfully",
      data: employee
    });
  } catch (error) {
    console.error("Error creating employee:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

// Get all employees with filtering and pagination
const getAllEmployees = async (req, res) => {
  try {
    const { 
      team, 
      designation, 
      isActive, 
      isRecommended, 
      page = 1, 
      limit = 10, 
      search 
    } = req.query;

    let filter = {};
    
    // Apply filters
    if (team && team !== 'all') filter.team = team.toUpperCase();
    if (designation && designation !== 'all') filter.designation = { $regex: designation, $options: 'i' };
    if (isActive !== undefined) filter.isActive = isActive === 'true';
    if (isRecommended !== undefined) filter.isRecommended = isRecommended === 'true';
    
    // Search functionality
    if (search) {
      filter.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { designation: { $regex: search, $options: 'i' } },
        { specialization: { $regex: search, $options: 'i' } }
      ];
    }

    const employees = await Employee.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .select('-__v');

    const total = await Employee.countDocuments(filter);

    // Get available teams and designations for filters
    const teams = await Team.find({ isActive: true }).select('name');
    const designations = await Employee.distinct('designation');

    res.status(200).json({
      success: true,
      data: employees,
      pagination: {
        current: parseInt(page),
        total: Math.ceil(total / limit),
        results: employees.length,
        totalRecords: total
      },
      filters: {
        teams: teams.map(t => t.name),
        designations: designations.filter(d => d) // Remove null/empty values
      }
    });
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

// Get employee by ID
const getEmployeeById = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findById(id).select('-__v');
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found"
      });
    }

    res.status(200).json({
      success: true,
      data: employee
    });
  } catch (error) {
    console.error("Error fetching employee:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

// Update employee
const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      team,
      firstName,
      lastName,
      email,
      contactNumber,
      designation,
      isRecommended,
      isActive,
      specialization,
      experience,
      bio,
      profileImage
    } = req.body;

    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found"
      });
    }

    // Check if team exists (if team is being updated)
    if (team && team !== employee.team) {
      const teamExists = await Team.findOne({ 
        name: team.toUpperCase(), 
        isActive: true 
      });
      
      if (!teamExists) {
        return res.status(400).json({
          success: false,
          message: "Selected team does not exist or is inactive"
        });
      }
      employee.team = team.toUpperCase();
    }

    // Check if email already exists (if email is being updated)
    if (email && email !== employee.email) {
      const existingEmployee = await Employee.findOne({ 
        email: email.toLowerCase().trim(),
        _id: { $ne: id }
      });

      if (existingEmployee) {
        return res.status(400).json({
          success: false,
          message: "Employee with this email already exists"
        });
      }
      employee.email = email.toLowerCase().trim();
    }

    // Update other fields
    if (firstName) employee.firstName = firstName.trim();
    if (lastName) employee.lastName = lastName.trim();
    if (contactNumber) employee.contactNumber = contactNumber.trim();
    if (designation) employee.designation = designation.trim();
    if (isRecommended !== undefined) employee.isRecommended = isRecommended;
    if (isActive !== undefined) employee.isActive = isActive;
    if (specialization !== undefined) employee.specialization = specialization.trim();
    if (experience !== undefined) employee.experience = experience.trim();
    if (bio !== undefined) employee.bio = bio.trim();
    if (profileImage !== undefined) employee.profileImage = profileImage;

    await employee.save();

    res.status(200).json({
      success: true,
      message: "Employee updated successfully",
      data: employee
    });
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

// Delete employee (soft delete)
const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({
        success: false,
        message: "Employee not found"
      });
    }

    // Soft delete by setting isActive to false
    employee.isActive = false;
    await employee.save();

    res.status(200).json({
      success: true,
      message: "Employee deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

// Get employee statistics
const getEmployeeStats = async (req, res) => {
  try {
    const totalEmployees = await Employee.countDocuments({ isActive: true });
    const totalTeams = await Team.countDocuments({ isActive: true });
    const recommendedEmployees = await Employee.countDocuments({ 
      isRecommended: true, 
      isActive: true 
    });

    // Get team-wise distribution
    const teamStats = await Employee.aggregate([
      { $match: { isActive: true } },
      { $group: { _id: '$team', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalEmployees,
        totalTeams,
        recommendedEmployees,
        teamDistribution: teamStats
      }
    });
  } catch (error) {
    console.error("Error fetching employee stats:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
};

module.exports = {
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
};