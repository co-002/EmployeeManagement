import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppContext from "../context/AppContext";

const Dashboard = () => {
  const {
    isLoggedIn,
    isLoading,
    employees,
    addEmployee,
    editEmployee,
    deleteEmployee,
    getAllEmployees,
  } = useContext(AppContext);

  const navigate = useNavigate();

  const [showForm, setShowForm] = useState(false);
  const [editingEmployeeId, setEditingEmployeeId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    experience: "",
    lastWorkCompany: "",
    dateOfResignation: "",
    joiningDate: "", // Required field for backend
  });

  useEffect(() => {
    if (!isLoading && !isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, isLoading, navigate]);

  useEffect(() => {
    getAllEmployees();
  }, [getAllEmployees]);

  const handleAddClick = () => {
    setEditingEmployeeId(null);
    setFormData({
      name: "",
      email: "",
      address: "",
      experience: "",
      lastWorkCompany: "",
      dateOfResignation: "",
      joiningDate: "",
    });
    setShowForm(true);
  };

  const handleEdit = (employee) => {
    setFormData({
      name: employee.name || "",
      email: employee.email || "",
      address: employee.address || "",
      experience: employee.experience || "",
      lastWorkCompany: employee.lastWorkCompany || "",
      dateOfResignation: employee.dateOfResignation
        ? employee.dateOfResignation.split("T")[0]
        : "",
      joiningDate: employee.joiningDate
        ? employee.joiningDate.split("T")[0]
        : "",
    });
    setEditingEmployeeId(employee._id);
    setShowForm(true);
  };

  const handleDelete = (employeeId) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      deleteEmployee(employeeId).then(() => {
        getAllEmployees();
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editingEmployeeId) {
      await editEmployee(editingEmployeeId, formData);
    } else {
      await addEmployee(formData);
    }
    await getAllEmployees();

    setShowForm(false);
    setFormData({
      name: "",
      email: "",
      address: "",
      experience: "",
      lastWorkCompany: "",
      dateOfResignation: "",
      joiningDate: "",
    });
    setEditingEmployeeId(null);
  };

  if (isLoading)
    return <div className="container">Checking authentication...</div>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Employee List</h2>
        <button className="btn btn-success" onClick={handleAddClick}>
          Add Employee
        </button>
      </div>

      {showForm && (
        <div className="card p-3 mb-4">
          <h5>{editingEmployeeId ? "Edit Employee" : "Add New Employee"}</h5>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-4">
                <label htmlFor="name" className="form-label">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control"
                  placeholder="Enter full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-4">
                <label htmlFor="email" className="form-label">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-md-4">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  className="form-control"
                  placeholder="Enter address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4">
                <label htmlFor="experience" className="form-label">
                  Experience (Years)
                </label>
                <input
                  type="number"
                  id="experience"
                  name="experience"
                  className="form-control"
                  placeholder="e.g. 3"
                  value={formData.experience}
                  onChange={handleChange}
                  min="0"
                />
              </div>

              <div className="col-md-4">
                <label htmlFor="lastWorkCompany" className="form-label">
                  Last Work Company
                </label>
                <input
                  type="text"
                  id="lastWorkCompany"
                  name="lastWorkCompany"
                  className="form-control"
                  placeholder="Enter last company name"
                  value={formData.lastWorkCompany}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4">
                <label htmlFor="dateOfResignation" className="form-label">
                  Date of Resignation
                </label>
                <input
                  type="date"
                  id="dateOfResignation"
                  name="dateOfResignation"
                  className="form-control"
                  value={formData.dateOfResignation}
                  onChange={handleChange}
                />
              </div>

              <div className="col-md-4">
                <label htmlFor="joiningDate" className="form-label">
                  Joining Date *
                </label>
                <input
                  type="date"
                  id="joiningDate"
                  name="joiningDate"
                  className="form-control"
                  value={formData.joiningDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="col-12 text-end">
                <button type="submit" className="btn btn-primary me-2">
                  {editingEmployeeId ? "Update" : "Add"}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Address</th>
              <th>Experience</th>
              <th>Last Working Company</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map((emp, index) => (
                <tr key={emp._id}>
                  <td>{index + 1}</td>
                  <td>{emp.name}</td>
                  <td>{emp.address}</td>
                  <td>{emp.experience}</td>
                  <td>{emp.lastWorkCompany}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary me-2"
                      onClick={() => handleEdit(emp)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(emp._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No employees found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
