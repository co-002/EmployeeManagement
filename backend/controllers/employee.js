import { Employee } from "../models/employee.js";
import { EmployeeHistory } from "../models/employeeHistory.js";

export const createEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      address,
      experience,
      lastWorkCompany,
      dateOfResignation,
      joiningDate,
    } = req.body;

    if (!name || !email || !joiningDate) {
      return res.json({
        success: false,
        message: "Name, email and joining date are required",
      });
    }

    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.json({
        success: false,
        message: "Employee with this email already exists",
      });
    }

    const employee = new Employee({
      name,
      email,
      address,
      experience,
      lastWorkCompany,
      dateOfResignation,
      joiningDate,
    });

    await employee.save();

    return res.json({
      success: true,
      message: "Employee created successfully",
      employee,
    });
  } catch (error) {
    console.error("Create employee error:", error.message);
    return res.json({ success: false, message: "Server error" });
  }
};

export const updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;

    const employee = await Employee.findById(id);
    if (!employee) {
      return res.json({ success: false, message: "Employee not found" });
    }

    const previousValues = {};
    for (const key in updatedData) {
      if (
        updatedData.hasOwnProperty(key) &&
        employee[key] &&
        employee[key].toString() !== updatedData[key]?.toString()
      ) {
        previousValues[key] = employee[key];
      }
    }

    if (Object.keys(previousValues).length > 0) {
      await EmployeeHistory.create({
        employeeId: employee._id,
        previousValues,
      });
    }

    Object.assign(employee, updatedData);
    await employee.save();

    return res.json({ success: true, message: "Employee updated", employee });
  } catch (error) {
    console.error("Update error:", error.message);
    return res.json({ success: false, message: "Server error" });
  }
};

export const deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findById(id);
    if (!employee) {
      return res.json({ success: false, message: "Employee not found" });
    }

    await employee.deleteOne();

    await EmployeeHistory.deleteMany({ employeeId: id });

    return res.json({
      success: true,
      message: "Employee deleted successfully",
    });
  } catch (error) {
    console.error("Delete error:", error.message);
    return res.json({ success: false, message: "Server error" });
  }
};

export const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });

    return res.json({
      success: true,
      employees,
    });
  } catch (error) {
    console.error("Get employees error:", error.message);
    return res.json({ success: false, message: "Server error" });
  }
};
