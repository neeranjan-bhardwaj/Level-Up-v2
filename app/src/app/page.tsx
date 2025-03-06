"use client"

import { useEffect, useState } from 'react';
import axios from 'axios';
const Page = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/Roadmap');
        setData(response.data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <div>
      <h1>Fetched Data</h1>
      <pre>{data}</pre>
    </div>
  );
};

export default Page;