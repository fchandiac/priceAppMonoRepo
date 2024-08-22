"use client";
import { useState, useEffect } from "react";
import config from "../../config";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableContainer,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import { fetchProductsFiles, deleteProductFile } from "../../app/lib/data";
import DeleteIcon from "@mui/icons-material/Delete";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

export default function ProductsFileList({ reloadList }) {
  const [productsFiles, setProductsFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const files = await fetchProductsFiles();
        setProductsFiles(files);
      } catch (error) {
        console.error("Error fetching products files:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [reloadList]);

  const handleDelete = async (filename) => {
    await deleteProductFile(filename);
    setProductsFiles((prevFiles) =>
      prevFiles.filter((file) => file.name !== filename)
    );
  };

  return (
    <>
      <Box padding={2}>
        {/* Contenedor de la tabla con los encabezados */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: "60%" }}>Nombre del Archivo</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Mapeo de los archivos de precios */}
              {productsFiles.map((file) => (
                <TableRow key={file.name}>
                  <TableCell>{file.name}</TableCell>
                  <TableCell>{file.dateAdded}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => {
                        console.log("Delete file: ", file.name);
                        handleDelete(file.name);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        window.open(`${config.serverUrl}products/${file.name}`);
                      }}
                    >
                      <FileDownloadIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
