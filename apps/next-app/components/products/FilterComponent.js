"use client";
import React, { useEffect, useState } from "react";
import {
  TextField,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormControlLabel,
  Checkbox,
  Divider,
  Button,
} from "@mui/material";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import useFetchCommerces from "../../hooks/useFetchCommerces";

import SouthWestIcon from "@mui/icons-material/SouthWest";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import NorthEastIcon from "@mui/icons-material/NorthEast";

export default function FilterComponent() {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { commerces } = useFetchCommerces();
  const [priceFilter, setPriceFilter] = useState("all");

  const params = new URLSearchParams(searchParams.toString());

  // const defaultLimit = searchParams.get("limit") || 10;
  // const defaultHasPrices = searchParams.get("hasPrices") || true;
  // params.set("limit", defaultLimit);
  // params.set("hasPrices", defaultHasPrices);
  // replace(`${pathname}?${params.toString()}`);

  const setCode = (value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value !== "" && value !== null) {
      params.set("code", value);
    } else {
      params.delete("code");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  const setName = (value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value !== "" && value !== null) {
      params.set("name", value);
    } else {
      params.delete("name");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  const setFamily = (value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value !== "" && value !== null) {
      params.set("family", value);
    } else {
      params.delete("family");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  const setCommerce = (value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value !== "" && value !== null) {
      params.set("commerce", value);
    } else {
      params.delete("commerce");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  const setLimit = (value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value !== "" && value !== null) {
      params.set("limit", value);
    } else {
      params.delete("limit");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  const setHasPrice = (value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value !== "" && value !== null) {
      params.set("hasPrices", value);
    } else {
      params.delete("hasPrices");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  const setPriceFilterParam = (value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value !== "" && value !== null) {
      setPriceFilter(value);
      params.set("priceFilter", value);
    } else {
      params.delete("priceFilter");
    }

    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <Grid container spacing={2}>
      <Grid item xl={3} md={4} sm={6} xs={12}>
        <TextField
          label="Código Producto"
          name="productCode"
          onChange={(e) => setCode(e.target.value)}
          fullWidth
          size="small"
          defaultValue={searchParams.get("code") || ""}
        />
      </Grid>
      <Grid item xl={3} md={4} sm={6} xs={12}>
        <TextField
          label="Nombre Producto"
          name="productName"
          onChange={(e) => setName(e.target.value)}
          fullWidth
          size="small"
          defaultValue={searchParams.get("name") || ""}
        />
      </Grid>
      <Grid item xl={3} md={4} sm={6} xs={12}>
        <TextField
          label="Familia"
          name="family"
          onChange={(e) => setFamily(e.target.value)}
          fullWidth
          size="small"
          defaultValue={searchParams.get("family") || ""}
        />
      </Grid>
      <Grid item xl={3} md={3} sm={6} xs={12}>
        <FormControl fullWidth size="small">
          <InputLabel id="demo-simple-select-label">Comercio</InputLabel>

          <Select
            labelId="demo-simple-select-label"
            id="slect-commerce"
            label="Comercio"
            value={searchParams.get("commerce") || ""}
            onChange={(e) => setCommerce(e.target.value)}
          >
            {commerces.map((commerce, index) => (
              <MenuItem key={index} value={commerce}>
                {commerce}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xl={3} md={3} sm={6} xs={12}>
        <TextField
          label="Productos por página"
          type="number"
          name="limit"
          onChange={(e) => setLimit(e.target.value)}
          fullWidth
          size="small"
          defaultValue={searchParams.get("limit") || 10}
        />
      </Grid>
      <Grid item xl={3} md={3} sm={6} xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              checked={searchParams.get("hasPrices") === "true"}
              onChange={(e) => setHasPrice(e.target.checked)}
              color="primary"
              defaultValue={searchParams.get("hasPrices") || true}
            />
          }
          label="Solo productos con precios"
        />
      </Grid>
      <Grid item xl={3} md={3} sm={6} xs={12}
              sx={{
              display: "flex",
              justifyContent: "space-between",
              }}
           >
         
              <Button
                variant={priceFilter === "all" ? "contained" : "outlined"}
                onClick={() => setPriceFilterParam("all")}
                color="primary"
                sx={{

                }}
                
              >
                <OpenInFullIcon  sx={{
         
                }}/>
              </Button>
              <Button
                variant={priceFilter === "red" ? "contained" : "outlined"}
                onClick={() => setPriceFilterParam("red")}
                size="small"
                color="error"
              >
                <SouthWestIcon />
              </Button>
              <Button
                variant={priceFilter === "green" ? "contained" : "outlined"}
                onClick={() => setPriceFilterParam("green")}
                size="small"
                color="success"
              >
                <NorthEastIcon />
              </Button>
           
          </Grid>
      <Grid item  xs={12}>
        <Divider />
      </Grid>
    </Grid>
  );
}
