import { useState } from 'react';
import config from '../config'; // Ajusta la ruta según sea necesario

const useResetDatabase = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const resetDatabase = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${config.serverUrl}/db/reset`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result.message); // Mensaje de éxito desde el servidor

      // Puedes agregar cualquier lógica adicional aquí, como mostrar una notificación al usuario
    } catch (error) {
      console.error('Error resetting database:', error.message);
      setError('Error resetting database. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    resetDatabase,
    isLoading,
    error,
  };
};

export default useResetDatabase;
