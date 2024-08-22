"use client";
import React, { useState } from "react";
import PricesFileList from "../../components/files/PricesFilesList";
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
import UploadPricesDialog from "../../components/UploadPricesDialog";
import useLoadPrices from "../../hooks/useLoadPrices";

export default function Page() {
  const [openUploadFileDialog, setOpenUploadFileDialog] = useState(false);
  const [reloadList, setReloadList] = useState(false);

  const {
    loadPrices,
    loading: loadingPrices,
    error: loadPriceError,
  } = useLoadPrices();

  return (
    <>
      <Box  justifyContent="space-between" alignItems="left">
        <Typography variant="h4" gutterBottom>
          Lista de Archivos de Precios
        </Typography>
        <Box display={"flex"}>
          <Tooltip title="Subir Archivo">
            <IconButton onClick={() => setOpenUploadFileDialog(true)}>
              <FileUploadIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Recargar Productos en servidor">
            <IconButton
              onClick={() => {
                loadPrices();
                setReloadList(!reloadList);
              }}
            >
              <CachedIcon />
            </IconButton>
          </Tooltip>
          {loadingPrices && (
            <Alert severity="info">Actualizando precios en servidor...</Alert>
          )}
        </Box>
      </Box>

      <PricesFileList reloadList={reloadList} />

      <UploadPricesDialog
        open={openUploadFileDialog}
        onClose={() => {
          setReloadList(!reloadList);
          setOpenUploadFileDialog(false);
        }}
      />
    </>
  );
}
