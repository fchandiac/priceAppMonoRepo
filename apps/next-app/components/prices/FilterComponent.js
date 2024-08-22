"use client";
import React, { useEffect, useState } from "react";
import { TextField, Grid, Input } from "@mui/material";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import moment from "moment/moment";

const FilterComponent = () => {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const [code, setCode] = useState(searchParams.get("code") || "");
  const [name, setName] = useState(searchParams.get("name") || "");
  const [commerce, setCommerce] = useState(searchParams.get("commerce") || "");
  const [limit, setLimit] = useState(searchParams.get("limit") || 10);
  const [startDate, setStartDate] = useState(
    searchParams.get("startDate") ||
      moment().subtract(1, "months").format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState(
    searchParams.get("endDate") || moment().format("YYYY-MM-DD")
  );

  const updateSearchParam = (key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value !== "" && value !== null) {
      params.set("page", 1);
      params.set(key, value);
    } else {
      params.delete(key);
    }

    replace(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    updateSearchParam("code", code);
  }, [code]);

  useEffect(() => {
    updateSearchParam("name", name);
  }, [name]);

  useEffect(() => {
    updateSearchParam("commerce", commerce);
  }, [commerce]);

  useEffect(() => {
    updateSearchParam("limit", limit);
  }, [limit]);

  useEffect(() => {
    updateSearchParam("startDate", startDate);
  }, [startDate]);

  useEffect(() => {
    updateSearchParam("endDate", endDate);
  }, [endDate]);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={4}>
        <TextField
          label="Código Producto"
          name="productCode"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          fullWidth
          size="small"
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          label="Nombre Producto"
          name="productName"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          size="small"
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          label="Comercio"
          name="commerceName"
          value={commerce}
          onChange={(e) => setCommerce(e.target.value)}
          fullWidth
          size="small"
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          label="Precios por página"
          value={limit}
          onChange={(e) => setLimit(e.target.value)}
          type="number"
          fullWidth
          size="small"
        />
      </Grid>

      <Grid item xs={12} sm={4}>
        <TextField
          type="date"
          label="Fecha Inicio"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          fullWidth
          size="small"
        />
      </Grid>
      <Grid item xs={12} sm={4}>
        {/* <Input
          type="date"
          label="Fecha Fin"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          fullWidth
          size="small"
        /> */}
        <TextField
          type="date"
          label="Fecha Fin"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          fullWidth
          size="small"
        />
      </Grid>
    </Grid>
  );
};

export default FilterComponent;
