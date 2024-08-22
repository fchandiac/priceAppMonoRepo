import { useState } from 'react';
import config from '../config';
import * as XLSX from 'xlsx';

const usePricesExcelUploader = () => {
  const [isPricesUploading, setIsPricesUploading] = useState(false);
  const [pricesError, setPricesError] = useState(null);


  const validateExcelHeaders = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const data = new Uint8Array(event.target.result);
          const workbook = XLSX.read(data, { type: 'array' });
          const worksheet = workbook.Sheets[workbook.SheetNames[0]];
          const headers = XLSX.utils.sheet_to_json(worksheet, { header: 1 })[0];
          
          // Define the expected headers
          const expectedHeaders = ['code', 'commerce', 'price', 'date'];
          const actualHeaders = headers.map(header => header.toLowerCase().trim());

          const areHeadersValid = expectedHeaders.every((header, index) => header === actualHeaders[index]);
          if (!areHeadersValid) {
            setPricesError('Formato de archivo no válido. Asegúrese de que los encabezados sean  [code, commerce, price, date].');
            resolve(false); // Return false to indicate invalid headers without throwing an error
          } else {
            resolve(true);
          }
        } catch (error) {
          setPricesError('Error processing file headers.');
          resolve(false); // Return false in case of an exception
        }
      };
      reader.onerror = () => {
        setValidHeaders(false);
        setPricesError('Error reading file.');
        resolve(false); // Return false if there is an error reading the file
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const uploadPricesExcel = async (file) => {
    setIsPricesUploading(true);
    setPricesError(null);

    try {
      // Proceed with file upload
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${config.serverUrl}upload/prices`, {
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
      setPricesError(error.message);
    } finally {
      setIsPricesUploading(false);
    }
  };

  return {
    uploadPricesExcel,
    isPricesUploading,
    pricesError,
    validateExcelHeaders,
    setPricesError
  };
};

export default usePricesExcelUploader;
