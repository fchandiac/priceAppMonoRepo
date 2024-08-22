"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  CircularProgress,
  Typography,
  TablePagination,
  Pagination,
  Alert,
} from "@mui/material";
import useFilteredPrices from "../../hooks/useFilteredPrices";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

const PricesList = () => {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { prices, loading, error, totalPages, totalCount } =
    useFilteredPrices();
    

  return (
    <>
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
      <TableContainer
        sx={{
          backgroundColor: "transparent",
          height: "70vh",
          overflow: "auto",
        }}
      >
        <Box
          sx={{
            display: loading? "flex": "none",
            justifyContent: "center",
            alignItems: "center",
            height: "11vh",
            width: "100%",
          }}
        >
          <CircularProgress size={80} />
        </Box>
        <Alert severity="error" sx={{ display: error ? "flex" : "none", m: 2 }}
        >Error durante la carga de datos</Alert>
        <Table>
          <TableBody>
            {prices.map((price, index) => (
              <TableRow key={index}>
                <TableCell sx={{ width: 100 }}>{price.code}</TableCell>
                <TableCell sx={{ width: 200 }}>{price.product_name}</TableCell>
                <TableCell sx={{ width: 150 }}>{price.commerce}</TableCell>
                <TableCell sx={{ width: 120 }}>
                  {price.price.toLocaleString("es-CL", {
                    style: "currency",
                    currency: "CLP",
                  })}
                </TableCell>
                <TableCell sx={{ width: 150 }}>
                  {new Date(price.date).toLocaleDateString("es-CL")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        count={totalPages}
        page={parseInt(searchParams.get("page")) || 1}
        onChange={(e, page) => {
          const params = new URLSearchParams(searchParams.toString());
          params.set("page", page);
          replace(`${pathname}?${params.toString()}`);
        }}
        sx={{ marginTop: 2 }}
      />
    </>
  );
};

export default PricesList;
