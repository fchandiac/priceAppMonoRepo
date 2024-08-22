"use client";
import { Box, Grid, Typography } from "@mui/material";
import useFilteredProducts from "../../hooks/useFilteredProducts";
import ProductCart from "../ProductCard";
import { useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function ProductsList({
  code,
  name,
  family,
  commerce,
  limit,
  hasPrices,
  page,
  priceFilter
}) {
  const {
    products,
    loading,
    error,
    totalPages,
    totalCount,
    fetchFilteredProducts,
  } = useFilteredProducts(hasPrices, page, limit, name, code, family);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    setHasPrices(true);
    }, []);

  useEffect(() => {
    setTotalPage(totalPages);
  }, [totalPages]);

  const setTotalPage = (value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value !== "" && value !== null) {
      params.set("totalPages", value);
    } else {
      params.delete("totalPages");
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  const setHasPrices = (value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value !== "" && value !== null) {
      params.set("hasPrices", value);
    } else {
      params.delete("hasPrices");
    }

    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      {loading ? (
        <Typography variant="h6">Cargando...</Typography>
      ) : products.length > 0 ? (
        <Grid container spacing={2} mt={0}>
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={12} md={12} lg={6}>
              <ProductCart product={product} commerce={searchParams.get("commerce") || "" } priceFilter={priceFilter}/>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h6">No se encontraron productos.</Typography>
      )}
    </>
  );
}
