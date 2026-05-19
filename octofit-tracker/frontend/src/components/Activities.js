import React, { useEffect, useState } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseUrl = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
    : 'http://localhost:8000';
  const endpoint = `${baseUrl}/api/activities/`;

  useEffect(() => {
    console.log('Activities endpoint:', endpoint);
    fetch(endpoint)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Activities fetched data:', data);
        const items = Array.isArray(data) ? data : data?.results ?? [];
        setActivities(items);
      })
      .catch((fetchError) => {
        console.error('Error fetching Activities:', fetchError);
        setError(fetchError);
      })
      .finally(() => setLoading(false));
  }, [endpoint]);

  return (
    <div>
      <h2>Activities</h2>
      {error && <div className="alert alert-danger">Error loading activities.</div>}
      {loading ? (
        <div>Loading activities...</div>
      ) : (
        <div>
          <p>Endpoint: <code>{endpoint}</code></p>
          <ul className="list-group">
            {activities.length > 0 ? (
              activities.map((activity, index) => {
                const label = activity.name || activity.title || activity.id || `Activity ${index + 1}`;
                return (
                  <li className="list-group-item" key={activity.id ?? index}>
                    <strong>{label} </strong>
                    <pre className="mb-0">{JSON.stringify(activity, null, 2)}</pre>
                  </li>
                );
              })
            ) : (
              <li className="list-group-item">No activities found.</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Activities;
