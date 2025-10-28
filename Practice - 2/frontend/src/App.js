import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import Home from './Home';

function App() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: 20 }}>
      <nav style={{ marginBottom: 12 }}>
        <Link to="/" style={{ marginRight: 8 }}>Home</Link>
        <Link to="/login" style={{ marginRight: 8 }}>Login</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
