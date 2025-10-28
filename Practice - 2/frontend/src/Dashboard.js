import React, { useEffect, useState } from 'react';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No token found — please login first');
      return;
    }
    fetch('/dashboard', {
      headers: { 'Authorization': 'Bearer ' + token }
    })
      .then(async res => {
        const json = await res.json();
        if (!res.ok) throw new Error(json.message || 'Failed');
        setData(json);
      })
      .catch(err => setError(err.message));
  }, []);

  if (error) return <div style={{ color: 'red' }}>{error}</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <h2>Protected Dashboard</h2>
      <p>{data.message}</p>
      <pre>{JSON.stringify(data.user, null, 2)}</pre>
    </div>
  );
}
