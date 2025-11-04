import React, { useState, useEffect } from "react";

function Employees() {
  const [employees, setEmployees] = useState([]);
  const [searchEmpno, setSearchEmpno] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [newEmployee, setNewEmployee] = useState({
    empno: "",
    empname: "",
    tiercode: "",
    tiername: "",
    locationcode: "",
    locationname: "",
    departmentcode: "",
    departmentname: "",
    supervisorcode: "",
    supervisorname: "",
    salary: "",
    entrydate: "",
  });

  useEffect(() => {
    fetchAllEmployees();
  }, []);

  const fetchAllEmployees = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:8080/api/employees");
      if (!res.ok) throw new Error("Failed to fetch employee data");
      const data = await res.json();
      setEmployees(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    if (searchEmpno.trim() === "") {
      fetchAllEmployees();
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res = await fetch(`http://localhost:8080/api/employees/${searchEmpno}`);
      if (res.status === 404) {
        setEmployees([]);
        setError("Employee not found");
        return;
      }
      if (!res.ok) throw new Error("Failed to fetch employee data");

      const data = await res.json();
      setEmployees([data]);
    } catch (err) {
      setError(err.message);
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8080/api/employees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newEmployee),
      });

      if (!res.ok) throw new Error("Failed to add employee");
      alert("Employee added successfully!");
      setShowForm(false);
      fetchAllEmployees();
      setNewEmployee({
        empno: "",
        empname: "",
        tiercode: "",
        tiername: "",
        locationcode: "",
        locationname: "",
        departmentcode: "",
        departmentname: "",
        supervisorcode: "",
        supervisorname: "",
        salary: "",
        entrydate: "",
      });
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDelete = async (empno) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete employee #${empno}?`);
    if (!confirmDelete) return;

    try {
      const res = await fetch(`http://localhost:8080/api/employees/${empno}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete employee");
      alert("Employee deleted successfully!");
      fetchAllEmployees();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Employee List</h2>

      {/* Search & Add */}
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <input
          type="text"
          placeholder="Enter Employee No (e.g. 101)"
          value={searchEmpno}
          onChange={(e) => setSearchEmpno(e.target.value)}
          style={{
            padding: "8px",
            fontSize: "14px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            flex: "1",
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: "8px 12px",
            backgroundColor: "#2b2d42",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Search
        </button>
        <button
          onClick={() => setShowForm(true)}
          style={{
            padding: "8px 12px",
            backgroundColor: "#1a7431",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          + Add Employee
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Table */}
      {employees.length > 0 ? (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "10px",
            fontSize: "14px",
          }}
        >
          <thead>
            <tr style={{ background: "#2b2d42", color: "white" }}>
              {[
                "Emp No",
                "Name",
                "Tier Code",
                "Tier Name",
                "Department Code",
                "Department Name",
                "Location Code",
                "Location Name",
                "Supervisor Code",
                "Supervisor Name",
                "Salary",
                "Entry Date",
                "Actions",
              ].map((header) => (
                <th key={header} style={{ padding: "8px", border: "1px solid #ccc" }}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.empno}>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{emp.empno}</td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{emp.empname}</td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{emp.tiercode}</td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{emp.tiername}</td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{emp.departmentcode}</td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{emp.departmentname}</td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{emp.locationcode}</td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{emp.locationname}</td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {emp.supervisorcode ?? "-"}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {emp.supervisorname ?? "-"}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {emp.salary?.toLocaleString("id-ID")}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>{emp.entrydate}</td>
                <td style={{ border: "1px solid #ccc", padding: "8px", textAlign: "center" }}>
                  <button
                    onClick={() => handleDelete(emp.empno)}
                    style={{
                      backgroundColor: "#d90429",
                      color: "white",
                      border: "none",
                      padding: "5px 8px",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !loading && <p>No employees found.</p>
      )}

      {/* Add Employee Form (same as before) */}
      {showForm && (
        <div
          style={{
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <form
            onSubmit={handleAddEmployee}
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              width: "400px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <h3>Add Employee</h3>
            {Object.keys(newEmployee).map((key) => (
              <input
                key={key}
                type="text"
                placeholder={key}
                value={newEmployee[key]}
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, [key]: e.target.value })
                }
                style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
              />
            ))}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                style={{
                  padding: "8px 12px",
                  backgroundColor: "#aaa",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{
                  padding: "8px 12px",
                  backgroundColor: "#1a7431",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                }}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default Employees;
