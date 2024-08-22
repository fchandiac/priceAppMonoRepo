import { useState, useEffect } from 'react';
import config from '../config'; 

function useFetchExcelPricesData(filename) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!filename) return;

        const fetchData = async () => {
            setLoading(true);
            setError(null);

            try {
                // Usar la URL base desde el archivo de configuración
                const response = await fetch(`${config.serverUrl}/files/prices/read-excel?filename=${filename}`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.statusText}`);
                }
                const jsonData = await response.json();
                setData(jsonData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [filename]);

    return { data, loading, error };
}

export default useFetchExcelPricesData;
