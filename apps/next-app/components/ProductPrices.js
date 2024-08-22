"use client";
//Path: components/ProductPrices.js
import React, { useEffect, useState } from "react";
import useFetchPricesByProduct from "../hooks/useFetchPricesByProduct"; // Asegúrate de importar el hook
import {
  Box,
  Typography,
  List,
  ListItem,
  Chip,
  Button,
  IconButton,
  Grid,
} from "@mui/material";
import SouthWestIcon from "@mui/icons-material/SouthWest";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import NorthEastIcon from "@mui/icons-material/NorthEast";

export default function ProductPrices({ productCode, commerce, priceFilter }) {
  const { prices, loading, error, fetchPricesByProduct } =
    useFetchPricesByProduct();

  useEffect(() => {
    if (productCode) {
      fetchPricesByProduct(productCode);
    }
  }, [productCode]);

  // Función para obtener el precio más reciente por comercio
  const getLatestPricesByCommerce = () => {
    const latestPrices = {};

    prices.forEach((price) => {
      const { commerce, date } = price;

      if (
        !latestPrices[commerce] ||
        new Date(date) > new Date(latestPrices[commerce].date)
      ) {
        latestPrices[commerce] = price;
      }
    });

    return Object.values(latestPrices);
  };

  const latestPrices = getLatestPricesByCommerce();

  // Encontrar el precio más reciente para el comercio objetivo
  const targetPrice = latestPrices
    .filter((price) => price.commerce === commerce)
    .sort((a, b) => new Date(b.date) - new Date(a.date))[0];

  // Comparar con los precios más recientes de otros comercios
  const priceComparison = latestPrices
    .filter((price) => price.commerce !== commerce)
    .map((otherPrice) => {
      const difference = targetPrice ? otherPrice.price - targetPrice.price : 0;
      const percentage = targetPrice
        ? ((targetPrice.price - otherPrice.price) / otherPrice.price) * 100
        : 0;
      return {
        commerce: otherPrice.commerce,
        price: otherPrice.price,
        difference: difference,
        percentage: percentage,
        date: otherPrice.date,
      };
    });

  const colorToHex = (color) => {
    switch (color) {
      case "success":
        return "#a5d6a7";
      case "error":
        return "#ff8a80";
      default:
        return "#e0e0e0";
    }
  };

  function darkenColor(hexColor, percent) {
    // Convertir el color hexadecimal a RGB
    let r = parseInt(hexColor.substring(1, 3), 16);
    let g = parseInt(hexColor.substring(3, 5), 16);
    let b = parseInt(hexColor.substring(5, 7), 16);

    // Reducir los valores RGB según el porcentaje
    r = Math.floor(r * (1 - percent / 100));
    g = Math.floor(g * (1 - percent / 100));
    b = Math.floor(b * (1 - percent / 100));

    // Asegurarse de que los valores estén en el rango [0, 255]
    r = Math.max(0, Math.min(255, r));
    g = Math.max(0, Math.min(255, g));
    b = Math.max(0, Math.min(255, b));

    // Convertir de nuevo a color hexadecimal
    const darkenedHexColor = `#${r.toString(16).padStart(2, "0")}${g
      .toString(16)
      .padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;

    return darkenedHexColor;
  }

  const filteredPrices = priceComparison.filter((comparison) => {
    switch (priceFilter) {
      case "all":
        return true;
      case "red":
        return comparison.difference < 0;
      case "green":
        return comparison.difference > 0;
      default:
        return false;
    }
  });

  const differenceString = (difference) => {
    const sign = difference > 0 ? "+" : "-";
    const diferenceValue = Math.abs(difference).toLocaleString("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    return `${sign}${diferenceValue}`;
  }
  

  return (
    <Box>
      {/* <Typography variant="body2" color="textSecondary">
        Comercio: {commerce}
      </Typography> */}

      {loading && <Typography fontSize={8}>Cargando precios...</Typography>}
      {/* {error && <Typography color="error">Error: {error}</Typography>} */}
      {prices.length === 0 && !loading && (
        <Typography>No se encontraron precios para este producto.</Typography>
      )}
      {prices.length > 0 && (
        <Grid container spacing={0.5}>
          <Grid item xs={12} textAlign={"center"}>
            <Typography variant="h6">Comparación de Precios</Typography>
          </Grid>
          {targetPrice && (
            <Grid item xs={12}>
              <Box
                justifyContent="space-between"
                sx={{
                  textAlign: "center",
                  border: 1,
                  borderColor: "primary",
                  borderRadius: 1,
                  padding: "2px",
                  backgroundColor: "primary",
                  fontSize: 12,
                }}
              >
                {`Comercio: ${targetPrice.commerce} - Precio: ${targetPrice.price}`}
              </Box>
            </Grid>
          )}

          {filteredPrices.map((comparison, index) => {
            const difference = comparison.difference.toFixed(2);
            const sign = comparison.difference > 0 ? "+" : "";
            const color =
              comparison.difference > 0
                ? "success"
                : comparison.difference < 0
                ? "error"
                : "default";
            return (
              <Grid item xs={4} key={index}>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  sx={{
                    width: "auto",
                    border: 1,
                    borderColor: darkenColor(colorToHex(color), 30),
                    borderRadius: 1,
                    padding: "2px",
                    backgroundColor: colorToHex(color),
                  }}
                >
              
                  <Typography fontSize={10} style={{ whiteSpace: "pre-line" }}>
                    {`Comercio: ${comparison.commerce} - Precio: ${
                      comparison.price.toLocaleString("es-CL", {
                        style: "currency",
                        currency: "CLP",
                      })
                    }\nDiferencia: ${differenceString(difference)} (${comparison.percentage.toFixed(
                      2
                    )}%) - Fecha: ${new Date(
                      comparison.date
                    ).toLocaleDateString()}`}
                  </Typography>
                </Box>
              </Grid>
            );
          })}

       
        </Grid>
      )}
    </Box>
  );
}
