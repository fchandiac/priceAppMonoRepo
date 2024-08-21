const express = require("express");
const router = express.Router();
const fs = require("fs").promises;
const path = require("path");
const moment = require("moment");

// Definir la ruta hacia la carpeta 'prices'
const pricesPath = path.join(__dirname, "..", "public", "prices");
const productsPath = path.join(__dirname, "..", "public", "products");

router.get("/files/prices", async (req, res) => {
  try {
    const files = await fs.readdir(pricesPath);

    // Filtrar archivos ocultos (nombres que comienzan con un punto)
    const visibleFiles = files.filter((file) => !file.startsWith("."));

    const filesWithDates = await Promise.all(
      visibleFiles.map(async (file) => {
        const filePath = path.join(pricesPath, file);
        const stats = await fs.stat(filePath);
        return {
          name: file,
          dateAdded: moment(stats.birthtime).format("DD-MM-YYYY HH:mm"), // Formato de la fecha
        };
      })
    );

    // Ordenar los archivos por la fecha más nueva primero
    const sortedFiles = filesWithDates.sort((a, b) => {
      // Convertir las fechas formateadas a objetos moment para comparación
      return moment(b.dateAdded, "DD-MM-YYYY HH:mm").diff(
        moment(a.dateAdded, "DD-MM-YYYY HH:mm")
      );
    });

    res.json(sortedFiles);
  } catch (err) {
    console.error("Error al leer la carpeta:", err);
    res.status(500).json({ message: "Error al leer la carpeta" });
  }
});

// Endpoint para eliminar un archivo por nombre utilizando POST
router.post("/files/prices/delete", async (req, res) => {
  const { filename } = req.body;

  if (!filename) {
    return res
      .status(400)
      .json({ message: "El nombre del archivo es requerido" });
  }

  const filePath = path.join(pricesPath, filename);

  try {
    // Verificar si el archivo existe
    await fs.access(filePath);

    // Eliminar el archivo
    await fs.unlink(filePath);

    res.json({ message: `Archivo ${filename} eliminado exitosamente` });
  } catch (err) {
    if (err.code === "ENOENT") {
      // Archivo no encontrado
      res.status(404).json({ message: `Archivo ${filename} no encontrado` });
    } else {
      // Otro error
      console.error("Error al eliminar el archivo:", err);
      res.status(500).json({ message: "Error al eliminar el archivo" });
    }
  }
});

router.get("/files/prices/read-excel", async (req, res) => {
  const { filename } = req.query;

  if (!filename) {
    return res
      .status(400)
      .json({ message: "El nombre del archivo es requerido" });
  }

  const filePath = path.join(pricesPath, filename);

  try {
    // Verificar si el archivo existe
    await fs.access(filePath);

    // Leer el archivo Excel
    const workbook = XLSX.readFile(filePath);
    const sheetName = workbook.SheetNames[0]; // Leer la primera hoja
    const worksheet = workbook.Sheets[sheetName];

    // Convertir la hoja a JSON
    const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    // Excluir los encabezados (la primera fila)
    const dataWithoutHeaders = jsonData.slice(1);

    // Devolver los datos en formato JSON
    res.json(dataWithoutHeaders);
  } catch (err) {
    if (err.code === "ENOENT") {
      res.status(404).json({ message: `Archivo ${filename} no encontrado` });
    } else {
      console.error("Error al leer el archivo Excel:", err);
      res.status(500).json({ message: "Error al leer el archivo Excel" });
    }
  }
});

router.get("/files/products", async (req, res) => {
  try {
    const files = await fs.readdir(productsPath);

    // Filtrar archivos ocultos (nombres que comienzan con un punto)
    const visibleFiles = files.filter((file) => !file.startsWith("."));

    const filesWithDates = await Promise.all(
      visibleFiles.map(async (file) => {
        const filePath = path.join(productsPath, file);
        const stats = await fs.stat(filePath);
        return {
          name: file,
          dateAdded: moment(stats.birthtime).format("DD-MM-YYYY HH:mm"), // Formato de la fecha
        };
      })
    );

    // Ordenar los archivos por la fecha más nueva primero
    const sortedFiles = filesWithDates.sort((a, b) => {
      // Convertir las fechas formateadas a objetos moment para comparación
      return moment(b.dateAdded, "DD-MM-YYYY HH:mm").diff(
        moment(a.dateAdded, "DD-MM-YYYY HH:mm")
      );
    });

    res.json(sortedFiles);
  } catch (err) {
    console.error("Error al leer la carpeta:", err);
    res.status(500).json({ message: "Error al leer la carpeta" });
  }
});

router.post("/files/products/delete", async (req, res) => {
  const { filename } = req.body;

  if (!filename) {
    return res
      .status(400)
      .json({ message: "El nombre del archivo es requerido" });
  }

  const filePath = path.join(productsPath, filename);

  try {
    // Verificar si el archivo existe
    await fs.access(filePath);

    // Eliminar el archivo
    await fs.unlink(filePath);

    res.json({ message: `Archivo ${filename} eliminado exitosamente` });
  } catch (err) {
    if (err.code === "ENOENT") {
      // Archivo no encontrado
      res.status(404).json({ message: `Archivo ${filename} no encontrado` });
    } else {
      // Otro error
      console.error("Error al eliminar el archivo:", err);
      res.status(500).json({ message: "Error al eliminar el archivo" });
    }
  }
});

module.exports = router;
