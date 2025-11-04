import { useEffect, useState } from "react";
import api from "../api";

const Locations = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchCode, setSearchCode] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({
    locationcode: "",
    locationname: "",
  });

  // Fetch all locations initially
  useEffect(() => {
    fetchAllLocations();
  }, []);

  const fetchAllLocations = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/locations");
      setLocations(res.data);
    } catch (err) {
      console.error("Error fetching locations:", err);
      setError("Failed to fetch locations.");
    } finally {
      setLoading(false);
    }
  };

  // Search by locationcode
  const handleSearch = async () => {
    if (searchCode.trim() === "") {
      fetchAllLocations();
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res = await api.get(`/locations/${searchCode}`);
      setLocations([res.data]);
    } catch (err) {
      console.error("Error searching location:", err);
      setError("Location not found.");
      setLocations([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle delete
  const handleDelete = async (code) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete location "${code}"?`);
    if (!confirmDelete) return;

    try {
      await api.delete(`/locations/${code}`);
      alert("Location deleted successfully!");
      fetchAllLocations();
    } catch (err) {
      console.error("Error deleting location:", err);
      alert("Failed to delete location.");
    }
  };

  // Handle add/edit submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await api.put(`/locations/${currentLocation.locationcode}`, currentLocation);
        alert("Location updated successfully!");
      } else {
        await api.post("/locations", currentLocation);
        alert("Location added successfully!");
      }
      setShowForm(false);
      fetchAllLocations();
      setCurrentLocation({ locationcode: "", locationname: "" });
      setEditMode(false);
    } catch (err) {
      console.error("Error saving location:", err);
      alert("Failed to save location.");
    }
  };

  // Handle edit click
  const handleEdit = (loc) => {
    setCurrentLocation(loc);
    setEditMode(true);
    setShowForm(true);
  };

  if (loading) return <p>Loading locations...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Location List</h2>

      {/* Search and Add Controls */}
      <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
        <input
          type="text"
          placeholder="Enter location code (e.g. L01)"
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
            setCurrentLocation({ locationcode: "", locationname: "" });
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
          + Add Location
        </button>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Table */}
      {locations.length > 0 ? (
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
            {locations.map((l) => (
              <tr key={l.locationcode}>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{l.locationcode}</td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{l.locationname}</td>
                <td
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "center",
                  }}
                >
                  <button
                    onClick={() => handleEdit(l)}
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
                    onClick={() => handleDelete(l.locationcode)}
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
        <p>No locations found.</p>
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
            <h3>{editMode ? "Edit Location" : "Add Location"}</h3>
            <input
              type="text"
              placeholder="Location Code"
              value={currentLocation.locationcode}
              onChange={(e) =>
                setCurrentLocation({ ...currentLocation, locationcode: e.target.value })
              }
              disabled={editMode}
              required
              style={{ padding: "8px", borderRadius: "5px", border: "1px solid #ccc" }}
            />
            <input
              type="text"
              placeholder="Location Name"
              value={currentLocation.locationname}
              onChange={(e) =>
                setCurrentLocation({ ...currentLocation, locationname: e.target.value })
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

export default Locations;
