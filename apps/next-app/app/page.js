
import { Box, Typography } from "@mui/material";
import FilterComponent from "../components/products/FilterComponent";
import ProductsList from "../components/products/ProductsList";
import ProductsPagination from "../components/products/ProductsPagination";

export default function Home({ searchParams }) {
  const { name, code, family, commerce, limit=10, hasPrices=true, page=1, totalPages=1, priceFilter='all' } = searchParams;


  return (
    <>
      <Typography variant="h4" gutterBottom>
        Productos
      </Typography>
      <FilterComponent />
      <Box
        sx={{
          height: "60vh",
          overflowY: "auto", // Permitir scroll vertical
          overflowX: "hidden", // Evitar scroll horizontal
          padding: 0, // Añadir un padding opcional
        }}
      >
        <ProductsList
          name={name}
          code={code}
          family={family}
          commerce={commerce}
          limit={limit}
          hasPrices={hasPrices}
          page={page}
          priceFilter={priceFilter}
        />
      </Box>
      <ProductsPagination/>
    </>
  );
}
