'use client';
import { useState, useEffect } from 'react';
import config from '../config';
import { useSearchParams } from 'next/navigation';

const useFilteredPrices = () => {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  const searchParams = useSearchParams();
  
  const fetchFilteredPrices = async () => {
    setPrices([]);
    setLoading(true);
    setError(null);

    // Obtén los parámetros de búsqueda desde la URL
    const code = searchParams.get('code') || '';
    const name = searchParams.get('name') || '';
    const commerce = searchParams.get('commerce') || '';
    const page = parseInt(searchParams.get('page'), 10) || 1;
    const limit = parseInt(searchParams.get('limit'), 10) || 10;
    const date = searchParams.get('date') || '';

    try {
      const response = await fetch(`${config.serverUrl}prices/filter`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
          name,
          commerce,
          page,
          limit,
          date,
        }),
      });

      if (!response.ok) {
        throw new Error('Error fetching filtered prices');
      }

      const data = await response.json();
      setPrices(data.prices);
      setTotalPages(data.totalPages);
      setTotalCount(data.totalCount);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Efecto para ejecutar la consulta cuando cambian los parámetros
  useEffect(() => {
    fetchFilteredPrices();
  }, [searchParams]);

  return { prices, loading, error, totalPages, totalCount };
};

export default useFilteredPrices;

