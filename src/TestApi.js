import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TestApi = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:7132/api/test'); // Update this to a valid test endpoint
        setData(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>API Test</h1>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : <p>No data received</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
    </div>
  );
};

export default TestApi;
