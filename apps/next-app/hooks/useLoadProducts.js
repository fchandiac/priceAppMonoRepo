'use client';
import { useState } from 'react';
import config from '../config';

const useLoadProducts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadProducts = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Llamada para cargar productos
      const loadResponse = await fetch(`${config.serverUrl}products/load`, {
        method: 'GET',
      });

      if (!loadResponse.ok) {
        throw new Error(`HTTP error! Status: ${loadResponse.status}`);
      }

      const loadResult = await loadResponse.json();
      console.log(loadResult.message); // Mensaje de éxito desde el servidor

      // Llamada para resetear la base de datos
      const resetResponse = await fetch(`${config.serverUrl}db/reset`, {
        method: 'GET',
      });

      if (!resetResponse.ok) {
        throw new Error(`HTTP error during reset! Status: ${resetResponse.status}`);
      }

      const resetResult = await resetResponse.json();
      console.log(resetResult.message); // Mensaje de éxito desde el servidor

      // Recargar la página después de actualizar y resetear los productos
      window.location.reload();
    } catch (error) {
      console.error('Error loading or resetting products:', error.message);
      setError('Error loading or resetting products. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    loadProducts,
    isLoading,
    error,
  };
};

export default useLoadProducts;