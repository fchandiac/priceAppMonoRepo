'use client'
import { useState, useEffect } from "react";
import FilterComponent from "../../components/prices/FilterComponent";
import PricesPagination from "../../components/prices/PricesPagination";
import PriceTableBody from "../../components/prices/PriceTableBody";
import { fetchFilterPrices } from "../lib/data";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  Box,
} from "@mui/material";
import moment from "moment/moment";

export default function HomePage({ searchParams }) {
  // Acceder a los parámetros de búsqueda directamente desde los props
  const { code, name, commerce, page, limit, startDate, endDate} = searchParams;

  // Estado para almacenar los datos obtenidos
  const [data, setData] = useState({ prices: [], totalPages: 0 });

  // Estado para manejar la carga de datos
  const [loading, setLoading] = useState(true);

  // useEffect para realizar la llamada a la API cuando se cargue el componente o cambien los parámetros
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await fetchFilterPrices(code, name, commerce, page, limit, startDate, endDate);
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [code, name, commerce, page, limit, startDate, endDate]); // Dependencias que disparan el efecto cuando cambian

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh", // Usa el alto completo de la ventana

        }}
      >
          <Typography variant="h4" gutterBottom>
        Precios
      </Typography>
        <FilterComponent />
        <TableContainer sx={{ backgroundColor: "transparent" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: 100 }}>Código</TableCell>
                <TableCell sx={{ width: 200 }}>Producto</TableCell>
                <TableCell sx={{ width: 150 }}>Comercio</TableCell>
                <TableCell sx={{ width: 120 }}>Precio</TableCell>
                <TableCell sx={{ width: 150 }}>Fecha</TableCell>
              </TableRow>
            </TableHead>
          </Table>
        </TableContainer>
        <Box
          sx={{
            flexDirection: "column",
            height: "60%", // Usa el alto completo de la ventana
            padding: 2,
            overflow: "auto",
            maxHeight: "60%", // Altura máxima del contenedor
          }}
        >
          {loading ? (
            <Typography>Cargando...</Typography>
          ) : (
            <PriceTableBody prices={data.prices} />
          )}
        </Box>
        <Box>
          <PricesPagination totalPages={data.totalPages} />
        </Box>
      </Box>
    </>
  );
}
