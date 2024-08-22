import { useState, useEffect } from 'react';
import config from '../config'; // Ajusta la ruta de importación según tu estructura

const useFetchCommerces = () => {
  const [commerces, setCommerces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCommerces = async () => {
      try {
        const response = await fetch(`${config.serverUrl}prices/commerces`); // Usa la URL del servidor desde config
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCommerces(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCommerces();
  }, []); // Empty dependency array ensures this runs once when the component mounts

  return { commerces, loading, error };
};

export default useFetchCommerces;
