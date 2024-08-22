import React, { useState } from 'react';
import {
  Box,
  Typography,
  Dialog,
  Button,
  CircularProgress,
  Alert,
} from '@mui/material';
import useProductsExcelUploader from '../hooks/useProductsExcelUploader';

const UploadProductsDialog = ({ open, onClose }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const { uploadProductsExcel, isProductsUploading, productsError } =
    useProductsExcelUploader();

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (selectedFile) {
      await uploadProductsExcel(selectedFile);
      setSelectedFile(null);
      if (!productsError) {
        onClose(); // Cerrar el diálogo si no hay errores
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          width: '300px',
        }}
      >
        <Typography variant="h6" sx={{ marginBottom: '10px' }}>
          Subir Archivo de Productos
        </Typography>
        <form onSubmit={handleUploadSubmit}>
          <input
            type="file"
            accept=".xlsx"
            onChange={handleFileChange}
            style={{ marginBottom: '10px' }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isProductsUploading}
          >
            {isProductsUploading ? (
              <CircularProgress size={24} />
            ) : (
              'Subir'
            )}
          </Button>
        </form>
        {productsError && (
          <Alert severity="error" sx={{ marginTop: '10px' }}>
            {productsError}
          </Alert>
        )}
      </Box>
    </Dialog>
  );
};

export default UploadProductsDialog;
