import { useState } from 'react';
import config from '../config';

export default function useDeleteFile() {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const deleteFile = async (filename) => {
    setIsDeleting(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch( config.serverUrl + 'files/prices/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ filename }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al eliminar el archivo');
      }

      const data = await response.json();
      setSuccessMessage(data.message);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  return { deleteFile, isDeleting, error, successMessage };
}
