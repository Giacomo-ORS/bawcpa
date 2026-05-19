import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseUrl = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
    : 'http://localhost:8000';
  const endpoint = `${baseUrl}/api/leaderboard/`;

  useEffect(() => {
    console.log('Leaderboard endpoint:', endpoint);
    fetch(endpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Leaderboard fetched data:', data);
        const payload = Array.isArray(data) ? data : data?.results ?? [];
        setItems(payload);
      })
      .catch((fetchError) => {
        console.error('Error fetching Leaderboard:', fetchError);
        setError(fetchError);
      })
      .finally(() => setLoading(false));
  }, [endpoint]);

  return (
    <div>
      <h2>Leaderboard</h2>
      {error && <div className="alert alert-danger">Error loading leaderboard.</div>}
      {loading ? (
        <div>Loading leaderboard...</div>
      ) : (
        <div>
          <p>Endpoint: <code>{endpoint}</code></p>
          <ul className="list-group">
            {items.length > 0 ? (
              items.map((item, index) => {
                const label = item.name || item.username || item.title || item.id || `Entry ${index + 1}`;
                return (
                  <li className="list-group-item" key={item.id ?? index}>
                    <strong>{label} </strong>
                    <pre className="mb-0">{JSON.stringify(item, null, 2)}</pre>
                  </li>
                );
              })
            ) : (
              <li className="list-group-item">No leaderboard entries found.</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
