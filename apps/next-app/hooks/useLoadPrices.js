import { useState } from 'react';
import config from '../config';

const useLoadPrices = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const loadPrices = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${config.serverUrl}prices/load`); // Ajusta el prefijo de la API según tu configuración
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const result = await response.json();
            setData(result.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { data, error, loading, loadPrices };
};

export default useLoadPrices;
