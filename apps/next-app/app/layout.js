"use client";
import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import React, { useState } from "react";
import Link from "next/link";


import "./globals.css";

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            width: "100vw",
            backgroundColor: "grey.100",
          }}
        >
          <Box
            sx={{
              display: "flex",
              padding: "5px",
              height: "100vh",
              width: "10vw",
              minWidth: "200px",
              flexDirection: "column",
              backgroundColor: "grey.300",
            }}
          >
            <Typography variant="h6" sx={{ marginBottom: "20px" }}>
              PricesApp
            </Typography>

            <List>
              <Link href="/" passHref legacyBehavior>
                <ListItem button>
                  <ListItemText primary="Productos" />
                </ListItem>
              </Link>
              <Link href="/productsFiles" passHref legacyBehavior>
                <ListItem button component="a">
                  <ListItemText primary="Archivos de productos" />
                </ListItem>
              </Link>
              <Link href="/prices" passHref legacyBehavior>
                <ListItem button component="a">
                  <ListItemText primary="Precios" />
                </ListItem>
              </Link>
              <Link href="/pricesFiles" passHref legacyBehavior>
                <ListItem button component="a">
                  <ListItemText primary="Archivos de precios" />
                </ListItem>
              </Link>

            </List>
          </Box>

          <Box sx={{ padding: 2, width: "100%", backgroundColor: "grey.70" }}>
            {children}
          </Box>
        </Box>

  
      </body>
    </html>
  );
}
