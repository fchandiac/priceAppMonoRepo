"use client";
import React, { useRef } from "react";
import { Box, Divider, Grid, Typography } from "@mui/material";
import ProductPrices from "./ProductPrices"; // Asegúrate de importar el componente
import PriceChart from "./PriceChart";
import PrintButton from "./PrintButton";
import '../app/globals.css'


const ProductCart = ({ product, commerce, priceFilter }) => {
  const printRef = useRef();

  return (
    <Box
      sx={{
        border: "1px solid #ccc",
        borderRadius: 1,
      }}
    >
      <Grid container ref={printRef} p={1} className="printMargins">
        <Grid item xs={12} sm={12} md={12} xl={12}>
          <Box display={"flex"}>
            <Typography sx={{ flexGrow: 1 }} fontSize={20} fontWeight="bold">
              {product.descprod}
              <Typography fontSize={16} color="textSecondary">
                <strong>Código de Barras:</strong> {product.id_mcodbarra}
              </Typography>
            </Typography>
            <Box display={"block"} displayPrint={'none'} >
              <PrintButton componentRef={printRef} />
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} mt={2} mb={1}>
          <Divider />
        </Grid>

        <Grid item xs={12} sm={12} md={12} xl={12}>
          <Grid container>
            <Grid item xs={6} sm={6} md={6} xl={6}>
              <Typography fontSize={10} color="textSecondary">
                <strong>ID:</strong> {product.id_mprod}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={6} md={6} xl={6}>
              <Typography fontSize={10} color="textSecondary">
                <strong>Familia:</strong> {product.familia}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={6} md={6} xl={6}>
              <Typography fontSize={10} color="textSecondary">
                <strong>Sufamilia:</strong> {product.sufamilia}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={6} md={6} xl={6}>
              <Typography fontSize={10} color="textSecondary">
                <strong>Impuesto:</strong> {product.impuesto}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={6} md={6} xl={6}>
              <Typography fontSize={10} color="textSecondary">
                <strong>Tasa:</strong> {product.tasa}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={6} md={6} xl={6}>
              <Typography fontSize={10} color="textSecondary">
                <strong>Costo:</strong> ${product.costo.toLocaleString("es-Cl")}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={6} md={6} xl={6}>
              <Typography fontSize={10} color="textSecondary">
                <strong>Fecha de Actualización:</strong>{" "}
                {new Date(product.fecha_actualizacion).toLocaleString()}
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} mt={2} mb={1}>
          <Divider />
        </Grid>

        <Grid item xs={12}>
          <ProductPrices
            productCode={product.id_mcodbarra}
            commerce={commerce}
            priceFilter={priceFilter}
          />
        </Grid>
        <Grid item xs={12} mt={2} mb={1}>
          <Divider />
        </Grid>
        <Grid item xs={12} mb={1}>
          <PriceChart
            productCode={product.id_mcodbarra}
            commerceName={commerce}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductCart;
