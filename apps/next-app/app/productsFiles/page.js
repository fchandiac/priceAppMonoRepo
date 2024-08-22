"use client";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Dialog,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import CachedIcon from "@mui/icons-material/Cached";
import ProductsFileList from "../../components/files/productsFileList";
import UploadProductsDialog from "../../components/UploadProductsDialog";
import useLoadProducts from "../../hooks/useLoadProducts";


export default function page() {
  const [openUploadFileDialog, setOpenUploadFileDialog] = useState(false);
  const [reloadList, setReloadList] = useState(false);
  const { error, isLoading: isLoadingProducts, loadProducts } = useLoadProducts();
   


  return (
    <>
      <Box justifyContent="space-between" alignItems="left">
        <Typography variant="h4" gutterBottom>
          Lista de Archivos de Productos
        </Typography>
        <Box display={"flex"}>
          <Tooltip title="Subir Archivo">
            <IconButton onClick={() => setOpenUploadFileDialog(true)}>
              <FileUploadIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Recargar productos en servidor">
            <IconButton
              onClick={() => {
                loadProducts();
                setReloadList(!reloadList);
              }}
            >
              <CachedIcon />
            </IconButton>
          </Tooltip>
          {isLoadingProducts && (
            <Alert severity="info">Actualizando precios en servidor...</Alert>
          )}
        </Box>
      </Box>
      <ProductsFileList reloadList={reloadList} />
      <UploadProductsDialog
        open={openUploadFileDialog}
        onClose={() => {
          setOpenUploadFileDialog(false);
          setReloadList(!reloadList)
        }}
      />
    </>
  );
}
