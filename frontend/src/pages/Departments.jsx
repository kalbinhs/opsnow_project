import { useEffect, useState } from "react";
import api from "../api";

const Departments = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchCode, setSearchCode] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentDepartment, setCurrentDepartment] = useState({
    departmentcode: "",
    departmentname: "",
  });

  // Fetch all departments initially
  useEffect(() => {
    fetchAllDepartments();
  }, []);

  const fetchAllDepartments = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/departments");
      setDepartments(res.data);
    } catch (err) {
      console.error("Error fetching departments:", err);
      setError("Failed to fetch departments.");
    } finally {
      setLoading(false);
    }
  };

  // Search by department code
  const handleSearch = async () => {
    if (searchCode.trim() === "") {
      fetchAllDepartments();
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res = await api.get(`/departments/${searchCode}`);
      setDepartments([res.data]);
    } catch (err) {
      console.error("Error searching department:", err);
      setError("Department not found.");
      setDepartments([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle delete
  const handleDelete = async (code) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete department "${code}"?`);
    if (!confirmDelete) return;

    try {
      await api.delete(`/departments/${code}`);
      alert("Department deleted successfully!");
      fetchAllDepartments();
    } catch (err) {
      console.error("Error deleting department:", err);
      alert("Failed to delete department.");
    }
  };

  // Handle add/edit submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await api.put(`/departments/${currentDepartment.departmentcode}`, currentDepartment);
        alert("Department updated successfully!");
      } else {
        await api.post("/departments", currentDepartment);
        alert("Department added successfully!");
      }
      setShowForm(false);
      fetchAllDepartments();
      setCurrentDepartment({ departmentcode: "", departmentname: "" });
      setEditMode(false);
    } catch (err) {
      console.error("Error saving department:", err);
      alert("Failed to save department.");
    }
  };

  // Handle edit click
  const handleEdit = (dept) => {
    setCurrentDepartment(dept);
    setEditMode(true);
    setShowForm(true);
  };

  if (loading) return <p>Loading departments...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Department List</h2>

      {/* Search and Add Controls */}
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <input
          type="text"
          placeholder="Enter department code (e.g. D01)"
          value={searchCode}
          onChange={(e) => setSearchCode(e.target.value)}
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
            backgroundColor: "#1e40af",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Search
        </button>
        <button
          onClick={() => {
            setShowForm(true);
            setEditMode(false);
            setCurrentDepartment({ departmentcode: "", departmentname: "" });
          }}
          style={{
            padding: "8px 12px",
            backgroundColor: "#1a7431",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          + Add Department
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Table */}
      {departments.length > 0 ? (
        <table
          style={{
            borderCollapse: "collapse",
            width: "100%",
            fontSize: "14px",
            border: "1px solid #ddd",
          }}
        >
          <thead style={{ backgroundColor: "#1e40af", color: "white" }}>
            <tr>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Code</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Name</th>
              <th style={{ padding: "10px", border: "1px solid #ddd" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((d) => (
              <tr key={d.departmentcode}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{d.departmentcode}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{d.departmentname}</td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  <button
                    onClick={() => handleEdit(d)}
                    style={{
                      backgroundColor: "#fbbf24",
                      color: "white",
                      border: "none",
                      padding: "5px 8px",
                      borderRadius: "5px",
                      marginRight: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(d.departmentcode)}
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
        <p>No departments found.</p>
      )}

      {/* Add/Edit Form */}
      {showForm && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              width: "350px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            <h3>{editMode ? "Edit Department" : "Add Department"}</h3>
            <input
              type="text"
              placeholder="Department Code"
              value={currentDepartment.departmentcode}
              onChange={(e) =>
                setCurrentDepartment({ ...currentDepartment, departmentcode: e.target.value })
              }
              disabled={editMode}
              required
              style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
            <input
              type="text"
              placeholder="Department Name"
              value={currentDepartment.departmentname}
              onChange={(e) =>
                setCurrentDepartment({ ...currentDepartment, departmentname: e.target.value })
              }
              required
              style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
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
                  backgroundColor: "#1e40af",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                }}
              >
                {editMode ? "Update" : "Submit"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default Departments;
