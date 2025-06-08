import mongoose from "mongoose";

const EmployeeHistorySchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  previousValues: { type: Object, required: true },
  updatedAt: { type: Date, default: Date.now },
});

export const EmployeeHistory = mongoose.model(
  "EmployeeHistory",
  EmployeeHistorySchema
);
