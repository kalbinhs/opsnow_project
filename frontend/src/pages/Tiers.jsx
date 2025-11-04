import { useEffect, useState } from "react";
import api from "../api";

const Tiers = () => {
  const [tiers, setTiers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchId, setSearchId] = useState("");
  const [formData, setFormData] = useState({ tiercode: "", tiername: "" });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchTiers();
  }, []);

  const fetchTiers = async (id) => {
    setLoading(true);
    try {
      const url = id ? `/tiers/${id}` : "/tiers";
      const res = await api.get(url);
      setTiers(Array.isArray(res.data) ? res.data : [res.data]);
    } catch (err) {
      console.error("Error fetching tiers:", err);
      setTiers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchId.trim() === "") fetchTiers();
    else fetchTiers(searchId.trim());
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await api.put(`/tiers/${formData.tiercode}`, formData);
        alert("Tier updated successfully!");
      } else {
        await api.post("/tiers", formData);
        alert("Tier added successfully!");
      }
      setFormData({ tiercode: "", tiername: "" });
      setIsEditing(false);
      fetchTiers();
    } catch (err) {
      console.error("Error saving tier:", err);
      alert("Failed to save tier.");
    }
  };

  const handleEdit = (tier) => {
    setFormData({ tiercode: tier.tiercode, tiername: tier.tiername });
    setIsEditing(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm(`Are you sure you want to delete tier ${id}?`)) {
      try {
        await api.delete(`/tiers/${id}`);
        alert("Tier deleted successfully!");
        fetchTiers();
      } catch (err) {
        console.error("Error deleting tier:", err);
        alert("Failed to delete tier.");
      }
    }
  };

  if (loading) return <p>Loading tiers...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Employee Tier List</h2>

      {/* 🔍 Search Bar */}
      <form onSubmit={handleSearch} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search by Tier Code"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          style={{ padding: "8px", marginRight: "10px" }}
        />
        <button type="submit" style={{ padding: "8px 15px" }}>
          Search
        </button>
      </form>

        <form
        onSubmit={handleSubmit}
        style={{
            marginBottom: "30px",
            border: "1px solid #e5e7eb",
            padding: "25px 30px",
            borderRadius: "10px",
            maxWidth: "420px",
            boxShadow: "0 4px 6px rgba(0,0,0,0.08)",
            backgroundColor: "white",
            boxSizing: "border-box",
        }}
        >
        <h3
            style={{
            marginBottom: "18px",
            color: "#1e40af",
            fontWeight: "600",
            }}
        >
            {isEditing ? "Update Tier" : "Add New Tier"}
        </h3>

        <input
            type="text"
            name="tiercode"
            placeholder="Tier Code"
            value={formData.tiercode}
            onChange={handleInputChange}
            disabled={isEditing}
            style={{
            display: "block",
            marginBottom: "14px",
            padding: "10px 12px",
            width: "100%",
            boxSizing: "border-box",
            border: "1px solid #cbd5e1",
            borderRadius: "8px",
            outlineColor: "#1e40af",
            fontSize: "14px",
            }}
        />

        <input
            type="text"
            name="tiername"
            placeholder="Tier Name"
            value={formData.tiername}
            onChange={handleInputChange}
            style={{
            display: "block",
            marginBottom: "18px",
            padding: "10px 12px",
            width: "100%",
            boxSizing: "border-box",
            border: "1px solid #cbd5e1",
            borderRadius: "8px",
            outlineColor: "#1e40af",
            fontSize: "14px",
            }}
        />

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
            type="submit"
            style={{
                backgroundColor: "#1e40af",
                color: "white",
                border: "none",
                padding: "10px 24px",
                borderRadius: "6px",
                cursor: "pointer",
                fontWeight: "500",
                transition: "background-color 0.2s ease",
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#1d4ed8")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#1e40af")}
            >
            {isEditing ? "Update" : "Add"}
            </button>
        </div>
        </form>


      {/* 📋 Tier Table */}
      <table border="1" cellPadding="10" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead style={{ backgroundColor: "#1e40af", color: "white" }}>
          <tr>
            <th>Tier Code</th>
            <th>Tier Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tiers.length > 0 ? (
            tiers.map((t, index) => (
              <tr key={index}>
                <td>{t.tiercode}</td>
                <td>{t.tiername}</td>
                <td>
                  <button onClick={() => handleEdit(t)} style={{ marginRight: "10px" }}>
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(t.tiercode)}
                    style={{ backgroundColor: "red", color: "white" }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={{ textAlign: "center" }}>
                No tiers found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Tiers;
