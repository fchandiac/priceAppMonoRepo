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
import { fetchPricesFiles } from "../../app/lib/data";
import useDeleteFile from "../../hooks/useDeleteFile"; // Ajusta la ruta según la ubicación del hook
import DeleteIcon from "@mui/icons-material/Delete";
import FileDownloadIcon from '@mui/icons-material/FileDownload';

export default function PricesFileList({ reloadList }) {
  // Estado para almacenar los archivos de precios
  const [pricesFiles, setPricesFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { deleteFile, isDeleting, error, successMessage } = useDeleteFile();

  // useEffect para cargar los archivos de precios al montar el componente
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const files = await fetchPricesFiles();
        setPricesFiles(files);
      } catch (error) {
        console.error("Error fetching prices files:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [reloadList]); // El array vacío indica que este efecto solo se ejecutará una vez al montar el componente

  const handleDelete = async (filename) => {
    await deleteFile(filename);
    // Después de eliminar el archivo, recargar la lista de archivos
    setPricesFiles((prevFiles) =>
      prevFiles.filter((file) => file.name !== filename)
    );
  };

  return (
    <Box padding={2}>
      {/* Contenedor de la tabla con los encabezados */}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell  sx={{ width: '60%' }}>Nombre del Archivo</TableCell>
              <TableCell >Fecha</TableCell>
              <TableCell ></TableCell>
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>

      {/* Contenedor de la tabla con el cuerpo */}
      <TableContainer>
        {loading ? (
          <Typography padding={2}>Cargando...</Typography>
        ) : (
          <Table>
            <TableBody>
              {pricesFiles.map((file, index) => (
                <TableRow key={index}>
                  <TableCell  sx={{ width: '60%' }}>{file.name}</TableCell>
                  <TableCell >{file.dateAdded}</TableCell>
                  <TableCell >
                    <IconButton
                      variant="contained"
                      onClick={() => handleDelete(file.name)}
                      disabled={isDeleting}
                    >
                      {isDeleting ? "Eliminando..." : ""}
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      variant="contained"
                      href={`${config.serverUrl}prices/${file.name}`}
                      target="_blank"
                    >
                      <FileDownloadIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </TableContainer>
    </Box>
  );
}
