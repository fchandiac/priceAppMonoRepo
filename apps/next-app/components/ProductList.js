"use client";
import { useState } from "react";
import {
  Pagination,
  Box,
  Typography,
  List,
  ListItem,
  TextField,
  Select,
  MenuItem,
  CircularProgress,
  Checkbox,
  FormControlLabel,
  Divider,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ProductCard from "./ProductCard";
import useFilteredProducts from "../hooks/useFilteredProducts"; // Ajustar ruta si es necesario
import useFetchCommerces from "../hooks/useFetchCommerces"; // Ajustar ruta si es necesario

export default function ProductList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchText, setSearchText] = useState("");
  const [codeFilter, setCodeFilter] = useState("");
  const [codeText, setCodeText] = useState("");
  const [familyFilter, setFamilyFilter] = useState("");
  const [familyText, setFamilyText] = useState("");
  const [currentCommerce, setCurrentCommerce] = useState("");
  const [hasPrices, setHasPrices] = useState(true);
  const [limit, setLimit] = useState(10); // Estado para el límite de resultados por página

  const [applyFilters, setApplyFilters] = useState(false); // Estado para aplicar filtros

  const {
    commerces,
    loading: commercesLoading,
    error: commercesError,
  } = useFetchCommerces(); // Usar el hook para obtener comercios

  const {
    products,
    totalPages,
    totalCount,
    loading: productsLoading,
    error: productsError,
  } = useFilteredProducts(
    hasPrices,
    currentPage,
    limit,
    searchTerm,
    codeFilter,
    familyFilter,
    applyFilters // Pasar estado de aplicar filtros al hook
  ); // Usar el hook para obtener productos filtrados

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };


  const handleCommerceChange = (event) => {
    setCurrentCommerce(event.target.value);
  };

  const handleHasPricesChange = (event) => {
    setHasPrices(event.target.checked);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value, 10)); // Convertir a entero
  };

  const applySearch = (filterType) => {
    setApplyFilters(true); // Activar la aplicación de filtros
    setCurrentPage(1); // Resetear la página actual al aplicar filtros
  };

  const clearFiltersHandler = () => {
    setSearchTerm("");
    setCodeFilter("");
    setFamilyFilter("");
    setCurrentCommerce("");
    setHasPrices(true);
    setApplyFilters(false); // Desactivar la aplicación de filtros
  };

  if (commercesLoading || productsLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100%",
        }}
      >
        <CircularProgress size={80} />
      </Box>
    );
  }

  if (commercesError)
    return (
      <Typography color="error" textAlign="center">
        Error: {commercesError.message}
      </Typography>
    );
  if (productsError)
    return (
      <Typography color="error" textAlign="center">
        Error: {productsError}
      </Typography>
    );
  return (
    <Box
      sx={{
        width: "100%",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Productos
      </Typography>
      <Box sx={{ display: "flex", gap: 2, marginBottom: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
          <TextField
            label="Buscar por nombre"
            variant="outlined"
            value={searchText}
            onChange={(e) => { setSearchText(e.target.value); }}
            size="small"
            fullWidth
          />
          <IconButton color="primary" onClick={() => {setSearchTerm(searchText); applySearch("searchTerm")}}>
            <SearchIcon />
          </IconButton>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
          <TextField
            label="Buscar por código"
            variant="outlined"
            value={codeText}
            onChange={(e) => { setCodeText(e.target.value); }}
            size="small"
            fullWidth
          />
          <IconButton color="primary" onClick={() => {
            setCodeFilter(codeText);
            applySearch("codeFilter");
          }}>
            <SearchIcon />
          </IconButton>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", flex: 1 }}>
          <TextField
            label="Buscar por familia"
            variant="outlined"
            value={familyText}
            onChange={(e) => { setFamilyText(e.target.value); }}
            size="small"
            fullWidth
          />
          <IconButton color="primary" onClick={() => {
            setFamilyFilter(familyText);
            applySearch("familyFilter");
          }}>
            <SearchIcon />
          </IconButton>
        </Box>
      </Box>
    
      <Box
        sx={{ display: "flex", gap: 2, marginBottom: 1, alignItems: "center" }}
      >
        <Select
          value={currentCommerce}
          onChange={handleCommerceChange}
          displayEmpty
          size="small"
          sx={{ flexShrink: 0, minWidth: 350 }} // Ajusta el tamaño mínimo del Select
        >
          <MenuItem value="" disabled>
            Selecciona un comercio
          </MenuItem>
          {commerces.map((commerce, index) => (
            <MenuItem key={index} value={commerce}>
              {commerce}
            </MenuItem>
          ))}
        </Select>

        <TextField
          label="Límite por página"
          variant="outlined"
          value={limit}
          onChange={handleLimitChange}
          size="small"
          type="number"
          sx={{ flexShrink: 0, minWidth: 100 }} // Ajusta el tamaño mínimo del TextField
        />

        <Box sx={{ flexGrow: 1 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={hasPrices}
                onChange={handleHasPricesChange}
                color="primary"
                sx={{ marginRight: 1 }} // Espacio entre el Checkbox y la etiqueta
              />
            }
            label="Solo con precios"
          />
        </Box>
      </Box>
      <Divider sx={{ marginBottom: 0 }} />
      <Box
        sx={{
          maxHeight: "68vh",
          overflowY: "auto",
          borderRadius: 1,
          padding: 0,
          width: "100%",
        }}
      >
        <List>
          {products.map((product, index) => (
            <ListItem
              key={index}
              sx={{
                border: "1px solid #ccc",
                borderRadius: 2,
                marginBottom: 1,
              }}
            >
              <ProductCard product={product} commerce={currentCommerce} />
            </ListItem>
          ))}
        </List>
      </Box>
      <Divider sx={{ marginTop: 0 }} />
      <Pagination
        sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}
        count={totalPages}
        page={currentPage}
        onChange={handlePageChange}
      />
    </Box>
  );
}
