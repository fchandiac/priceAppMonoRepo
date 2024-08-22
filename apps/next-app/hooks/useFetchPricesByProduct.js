import { useState } from 'react';
import config from '../config';


const useFetchPricesByProduct = () => {
    const [prices, setPrices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchPricesByProduct = async (id_mcodbarra) => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`${config.serverUrl}prices/findAllByProduct`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id_mcodbarra }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error fetching prices');
            }

            const data = await response.json();

            setPrices(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { prices, loading, error, fetchPricesByProduct };
};

export default useFetchPricesByProduct;
