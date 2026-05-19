import React, { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseUrl = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
    : 'http://localhost:8000';
  const endpoint = `${baseUrl}/api/users/`;

  useEffect(() => {
    console.log('Users endpoint:', endpoint);
    fetch(endpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Users fetched data:', data);
        const payload = Array.isArray(data) ? data : data?.results ?? [];
        setUsers(payload);
      })
      .catch((fetchError) => {
        console.error('Error fetching Users:', fetchError);
        setError(fetchError);
      })
      .finally(() => setLoading(false));
  }, [endpoint]);

  return (
    <div>
      <h2>Users</h2>
      {error && <div className="alert alert-danger">Error loading users.</div>}
      {loading ? (
        <div>Loading users...</div>
      ) : (
        <div>
          <p>Endpoint: <code>{endpoint}</code></p>
          <ul className="list-group">
            {users.length > 0 ? (
              users.map((user, index) => {
                const label = user.username || user.name || user.email || user.id || `User ${index + 1}`;
                return (
                  <li className="list-group-item" key={user.id ?? index}>
                    <strong>{label} </strong>
                    <pre className="mb-0">{JSON.stringify(user, null, 2)}</pre>
                  </li>
                );
              })
            ) : (
              <li className="list-group-item">No users found.</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Users;
