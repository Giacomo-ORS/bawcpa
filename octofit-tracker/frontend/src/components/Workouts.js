import React, { useEffect, useState } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseUrl = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
    : 'http://localhost:8000';
  const endpoint = `${baseUrl}/api/workouts/`;

  useEffect(() => {
    console.log('Workouts endpoint:', endpoint);
    fetch(endpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Workouts fetched data:', data);
        const payload = Array.isArray(data) ? data : data?.results ?? [];
        setWorkouts(payload);
      })
      .catch((fetchError) => {
        console.error('Error fetching Workouts:', fetchError);
        setError(fetchError);
      })
      .finally(() => setLoading(false));
  }, [endpoint]);

  return (
    <div>
      <h2>Workouts</h2>
      {error && <div className="alert alert-danger">Error loading workouts.</div>}
      {loading ? (
        <div>Loading workouts...</div>
      ) : (
        <div>
          <p>Endpoint: <code>{endpoint}</code></p>
          <ul className="list-group">
            {workouts.length > 0 ? (
              workouts.map((workout, index) => {
                const label = workout.name || workout.title || workout.id || `Workout ${index + 1}`;
                return (
                  <li className="list-group-item" key={workout.id ?? index}>
                    <strong>{label} </strong>
                    <pre className="mb-0">{JSON.stringify(workout, null, 2)}</pre>
                  </li>
                );
              })
            ) : (
              <li className="list-group-item">No workouts found.</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Workouts;
