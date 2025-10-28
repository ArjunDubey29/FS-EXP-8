import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [data, setData] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchRole = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/user", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setData(res.data.message);
      } catch {
        setData("Unauthorized or invalid token");
      }
    };
    fetchRole();
  }, [token]);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>{data}</h2>
    </div>
  );
}