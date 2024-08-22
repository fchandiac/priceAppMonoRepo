import { useState } from 'react';
import config from '../config';

const useProductsExcelUploader = () => {
  const [isProductsUploading, setIsProductsUploading] = useState(false);
  const [productsError, setProductsError] = useState(null);

  const clearProductsDirectory = async () => {
    try {
      const response = await fetch(`${config.serverUrl}clear/products`, {
        method: 'POST',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      console.log(result.message);
    } catch (error) {
      console.error('Error clearing products directory:', error.message);
      setProductsError('Error clearing products directory. Please try again.');
    }
  };

  const uploadProductsExcel = async (file) => {
    setIsProductsUploading(true);
    setProductsError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      // Primero, limpiar la carpeta de productos
      await clearProductsDirectory();

      // Luego, subir el archivo
      const response = await fetch(`${config.serverUrl}upload/products`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result.message); // Mensaje de éxito desde el servidor
    } catch (error) {
      console.error('Error uploading file:', error.message);
      setProductsError('Error uploading file. Please try again.');
    } finally {
      setIsProductsUploading(false);
    }
  };

  return {
    uploadProductsExcel,
    isProductsUploading,
    productsError,
  };
};

export default useProductsExcelUploader;
