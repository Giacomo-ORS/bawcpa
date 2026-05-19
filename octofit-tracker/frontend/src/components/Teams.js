import React, { useEffect, useState } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseUrl = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
    : 'http://localhost:8000';
  const endpoint = `${baseUrl}/api/teams/`;

  useEffect(() => {
    console.log('Teams endpoint:', endpoint);
    fetch(endpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Teams fetched data:', data);
        const payload = Array.isArray(data) ? data : data?.results ?? [];
        setTeams(payload);
      })
      .catch((fetchError) => {
        console.error('Error fetching Teams:', fetchError);
        setError(fetchError);
      })
      .finally(() => setLoading(false));
  }, [endpoint]);

  return (
    <div>
      <h2>Teams</h2>
      {error && <div className="alert alert-danger">Error loading teams.</div>}
      {loading ? (
        <div>Loading teams...</div>
      ) : (
        <div>
          <p>Endpoint: <code>{endpoint}</code></p>
          <ul className="list-group">
            {teams.length > 0 ? (
              teams.map((team, index) => {
                const label = team.name || team.title || team.id || `Team ${index + 1}`;
                return (
                  <li className="list-group-item" key={team.id ?? index}>
                    <strong>{label} </strong>
                    <pre className="mb-0">{JSON.stringify(team, null, 2)}</pre>
                  </li>
                );
              })
            ) : (
              <li className="list-group-item">No teams found.</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Teams;
