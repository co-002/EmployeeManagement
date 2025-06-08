import { useEffect, useState } from "react";
import AppContext from "./AppContext";
import axios from "axios";

const AppState = ({ children }) => {
  const url = "http://localhost:3000";

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    verifyUser();
  }, []);

  const verifyUser = async () => {
    try {
      const res = await axios.get(`${url}/user/verify`, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        setUser(res.data.user);
        setIsLoggedIn(true);
        getAllEmployees();
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.log("Verify error:", error.message);
      setUser(null);
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  };

  const getAllEmployees = async () => {
    try {
      const res = await axios.get(`${url}/employee/getAllEmp`, {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      });

      if (res.data.success) {
        setEmployees(res.data.employees);
      }
    } catch (err) {
      console.error("Failed to fetch employees:", err.message);
    }
  };

  const editEmployee = async (id, updatedData) => {
    try {
      const res = await axios.put(
        `${url}/employee/updateEmp/${id}`,
        updatedData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      alert(res.data.message);
      return res.data;
    } catch (error) {
      console.log("Edit employee error:", error.message);
      alert("Something went wrong while updating employee.");
    }
  };

  const deleteEmployee = async (id) => {
    try {
      const res = await axios.delete(`${url}/employee/deleteEmp/${id}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        await getAllEmployees();
      } else {
        alert("Failed to delete employee: " + data.message);
      }
    } catch (error) {
      console.error("Delete employee error:", error);
      alert("Server error while deleting employee");
    }
  };

  const addEmployee = async (employeeData) => {
    console.log(employeeData);
    try {
      const res = await axios.post(`${url}/employee/createEmp`, employeeData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      alert(res.data.message);
      return res.data;
    } catch (error) {
      console.error("Add employee error:", error.message);
      alert("Failed to add employee");
    }
  };

  const register = async ({ email, password }) => {
    try {
      const res = await axios.post(
        `${url}/user/auth/register`,
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      alert(res.data.message);
      return res.data;
    } catch (error) {
      console.log("Register error:", error.message);
      alert("Something went wrong during registration.");
    }
  };

  const login = async ({ email, password }) => {
    try {
      const res = await axios.post(
        `${url}/user/auth/login`,
        { email, password },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        setIsLoggedIn(true);
        setUser(res.data.user);
        getAllEmployees();
        alert(res.data.message);
      } else {
        alert("Login failed");
      }

      return res.data;
    } catch (error) {
      console.log("Login error:", error.message);
      alert("Something went wrong during login.");
    }
  };

  const logout = async () => {
    try {
      const res = await axios.get(`${url}/user/auth/logout`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (res.data.success) {
        setIsLoggedIn(false);
        setUser(null);
        setEmployees([]);
        alert(res.data.message);
      }
      return res;
    } catch (error) {
      console.log("Logout error:", error.message);
      alert("Logout failed.");
    }
  };

  return (
    <AppContext.Provider
      value={{
        login,
        register,
        logout,
        isLoggedIn,
        editEmployee,
        deleteEmployee,
        user,
        getAllEmployees,
        isLoading,
        addEmployee,
        employees,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppState;
