import React, { useState, useEffect } from 'react';

function LoginForm() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [remembered, setRemembered] = useState(false);

  useEffect(() => {
    // load saved username if any
    const saved = localStorage.getItem('savedUsername');
    if (saved) {
      setFormData(f => ({ ...f, username: saved }));
      setRemembered(true);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.username.trim() || !formData.password) {
      setError('Both fields are required');
      return;
    }
    setError('');
    console.log('Username:', formData.username);
    console.log('Password:', formData.password);
    alert('Login submitted — check console for values');

    // optionally save username
    if (remembered) localStorage.setItem('savedUsername', formData.username);
    else localStorage.removeItem('savedUsername');
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          style={styles.input}
        />
        <input
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          type="password"
          style={styles.input}
        />
        <label style={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={remembered}
            onChange={() => setRemembered(r => !r)}
          /> Remember username
        </label>
        {error && <div style={styles.error}>{error}</div>}
        <button type="submit" style={styles.button}>Login</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    width: 320,
    margin: '80px auto',
    padding: 20,
    borderRadius: 8,
    boxShadow: '0 6px 18px rgba(0,0,0,0.08)',
    textAlign: 'center'
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  input: {
    padding: '10px 12px',
    margin: '10px 0',
    fontSize: 16,
    borderRadius: 6,
    border: '1px solid #ccc'
  },
  button: {
    marginTop: 8,
    padding: '10px 12px',
    borderRadius: 6,
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#1976d2',
    color: 'white',
    fontSize: 16
  },
  error: {
    color: 'red',
    marginTop: 6
  },
  checkboxLabel: {
    fontSize: 14,
    textAlign: 'left'
  }
};

export default LoginForm;
