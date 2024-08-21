// Description: Este archivo contiene las funciones para inicializar la base de datos y obtener los productos y precios de la base de datos.
const DuckDB = require("duckdb");
const path = require("path");
fs = require("fs").promises;

const db = new DuckDB.Database(":memory:");

// Rutas de los archivos JSON
const jsonProductsPath = path.join(
  __dirname,
  "..",
  "public",
  "data",
  "products.json"
);
const jsonPricesPath = path.join(
  __dirname,
  "..",
  "public",
  "data",
  "prices.json"
);

// Consulta para crear las tablas y leer los archivos JSON
const readJsonSQL = `
DROP TABLE IF EXISTS productos;
DROP TABLE IF EXISTS prices;

CREATE TABLE productos AS 
SELECT * FROM read_json('${jsonProductsPath}');

CREATE TABLE prices AS 
SELECT * FROM read_json('${jsonPricesPath}');
`;

const countAllPices = `
SELECT COUNT(*) FROM prices;
`;

// Función para obtener todos los productos
function getAllProducts(callback) {
  db.all("SELECT * FROM productos", (err, rows) => {
    if (err) {
      callback(err, null);
    } else {
      // Convertir BigInt a Number si es necesario
      const convertedRows = rows.map((row) => {
        const newRow = {};
        for (const key in row) {
          if (typeof row[key] === "bigint") {
            newRow[key] = Number(row[key]);
          } else {
            newRow[key] = row[key];
          }
        }
        return newRow;
      });
      callback(null, convertedRows);
    }
  });
}

// Función para obtener todos los precios
function getAllPrices(callback) {
  db.all("SELECT * FROM prices", (err, rows) => {
    if (err) {
      callback(err, null);
    } else {
      // Convertir BigInt a Number si es necesario
      const convertedRows = rows.map((row) => {
        const newRow = {};
        for (const key in row) {
          if (typeof row[key] === "bigint") {
            newRow[key] = Number(row[key]);
          } else {
            newRow[key] = row[key];
          }
        }
        return newRow;
      });
      callback(null, convertedRows);
    }
  });
}

function getUniqueCommerces(callback) {
  const query = `
        SELECT DISTINCT commerce
        FROM prices
        ORDER BY commerce;
    `;

  db.all(query, (err, rows) => {
    if (err) {
      callback(err, null);
    } else {
      // Solo necesitamos devolver la lista de comercios
      const commerces = rows.map((row) => row.commerce);
      callback(null, commerces);
    }
  });
}

function getPricesByProductCode(productCode, callback) {
  const query = `
        SELECT p.*
        FROM prices p
        JOIN productos prod ON p.code = prod.id_mcodbarra
        WHERE prod.id_mcodbarra = '${productCode}';
    `;

  db.all(query, (err, rows) => {
    if (err) {
      callback(err, null);
    } else {
      // Convertir BigInt a Number si es necesario
      const convertedRows = rows.map((row) => {
        const newRow = {};
        for (const key in row) {
          if (typeof row[key] === "bigint") {
            newRow[key] = Number(row[key]);
          } else {
            newRow[key] = row[key];
          }
        }
        return newRow;
      });
      callback(null, convertedRows);
    }
  });
}

const resetProductsSQL = `
    DELETE FROM productos;
    INSERT INTO productos SELECT * FROM read_json('${jsonProductsPath}');
`;

const resetPricesSQL = `
    DELETE FROM prices;
    INSERT INTO prices SELECT * FROM read_json('${jsonPricesPath}');
`;

const deleteProductsTableSQL = `
    DELETE FROM productos;
`;

const resetProductsTable = () => {
  return new Promise(async (resolve, reject) => {
    try {
      // Leer el archivo JSON
      const jsonData = await fs.readFile(jsonProductsPath, "utf8");

      // Verificar si el archivo está vacío o solo contiene un array vacío
      const isEmpty = !jsonData || jsonData.trim() === "[]";

      if (isEmpty) {
        // Eliminar los registros de la tabla si el archivo está vacío
        db.run(deleteProductsTableSQL, (err) => {
          if (err) {
            console.error("Error deleting products data:", err.message);
            reject(err);
          } else {
            console.log("Products table cleared successfully.");
            resolve();
          }
        });
      } else {
        // Si el archivo no está vacío, restablecer la tabla
        db.run(resetProductsSQL, (err) => {
          if (err) {
            console.error("Error resetting products data:", err.message);
            reject(err);
          } else {
            console.log("Products table reset successfully.");
            resolve();
          }
        });
      }
    } catch (err) {
      console.error("Error reading JSON file or resetting table:", err.message);
      reject(err);
    }
  });
};

const resetPricesTable = () => {
  return new Promise((resolve, reject) => {
    db.run(resetPricesSQL, (err) => {
      if (err) {
        console.error("Error resetting prices data:", err.message);
        reject(err);
      } else {
        console.log("Prices table reset successfully.");
        resolve();
      }
    });
  });
};

const initializeDatabase = (callback) => {
  db.run(readJsonSQL, (err) => {
    if (err) {
      console.error("Error loading JSON data:", err.message);
      callback(err);
    } else {
      callback(null);
    }
  });
};

function getPricesWithProductName(
  searchTermCode,
  searchTermName,
  searchTermCommerce,
  startdate,
  enddate,
  callback
) {


  let query = `
    SELECT p.*, prod.descprod AS product_name
    FROM prices p
    JOIN productos prod ON p.code = prod.id_mcodbarra
    WHERE 1=1
  `;

  // Filtro por código de producto si se proporciona un término de búsqueda
  if (searchTermCode && searchTermCode.trim()) {
    query += ` AND LOWER(p.code) LIKE LOWER('%${searchTermCode}%')`;
  }

  // Filtro por nombre de producto si se proporciona un término de búsqueda
  if (searchTermName && searchTermName.trim()) {
    query += ` AND LOWER(prod.descprod) LIKE LOWER('%${searchTermName}%')`;
  }

  // Filtro por nombre de comercio si se proporciona un término de búsqueda
  if (searchTermCommerce && searchTermCommerce.trim()) {
    query += ` AND LOWER(p.commerce) LIKE LOWER('%${searchTermCommerce}%')`;
  }

  // Agrega un between para la fecha si se proporciona un término de búsqueda
  if (startdate && enddate) {
    query += ` AND p.date BETWEEN '${startdate}' AND '${enddate}'`;
  }
  



  db.all(query, (err, rows) => {
    if (err) {
      callback(err, null);
    } else {
      // Convertir BigInt a Number si es necesario
      const convertedRows = rows.map((row) => {
        const newRow = {};
        for (const key in row) {
          if (typeof row[key] === "bigint") {
            newRow[key] = Number(row[key]);
          } else {
            newRow[key] = row[key];
          }
        }
        return newRow;
      });
      callback(null, convertedRows);
    }
  });
}

function getCountOfPrices(callback) {
  const countQuery = `
      SELECT COUNT(*) AS total_prices FROM prices;
  `;

  db.all(countQuery, (err, rows) => {
    if (err) {
      callback(err, null);
    } else {
      // Devuelve el conteo total de precios
      callback(null, rows[0].total_prices);
    }
  });
}

function getFilteredProducts(
  { hasPrices, nameFilter, codeFilter, familyFilter },
  callback
) {
  const boolHasPrices = hasPrices === "true" ? true : false;
  
  if (boolHasPrices === true) {
    // Llamar a getCountOfPrices si hasPrices es verdadero
    getCountOfPrices((err, count) => {
      if (err) {
        console.log("Error al obtener precios");
        callback(err, null);
      } else if (count == 0n) {
        console.log("No hay precios");
        // Si no hay precios, devolver un array vacío
        callback(null, []);
      } else {
        // Si hay precios, proceder con la consulta principal
        // executeProductQuery(nameFilter, codeFilter, familyFilter, callback);
        executeProductExistFromPricesQuery(nameFilter, codeFilter, familyFilter, callback);
      }
    });
  } else {
    // // Si hasPrices es falso, proceder con la consulta principal
    executeProductQuery(nameFilter, codeFilter, familyFilter, callback);
  }
}

function executeProductQuery(nameFilter, codeFilter, familyFilter, callback) {
  let query = `
      SELECT prod.*
      FROM productos prod
      WHERE 1=1
  `;

  // Aplica los filtros de texto
  if (nameFilter && nameFilter.trim()) {
    query += ` AND LOWER(prod.descprod) LIKE LOWER('%${nameFilter}%')`;
  }
  if (codeFilter && codeFilter.trim()) {
    query += ` AND LOWER(prod.id_mcodbarra) = LOWER('${codeFilter}')`;
  }
  if (familyFilter && familyFilter.trim()) {
    query += ` AND LOWER(prod.familia) LIKE LOWER('%${familyFilter}%')`;
  }

  query += ` ORDER BY prod.descprod ASC`;

  db.all(query, (err, rows) => {
    if (err) {
      callback(err, null);
    } else {
      // Convertir BigInt a String o Number
      const processedRows = rows.map((row) => {
        const newRow = {};
        for (const key in row) {
          if (typeof row[key] === "bigint") {
            newRow[key] = row[key].toString(); // o usa .valueOf() si prefieres Number
          } else {
            newRow[key] = row[key];
          }
        }
        return newRow;
      });
      callback(null, processedRows);
    }
  });
}

function executeProductExistFromPricesQuery(nameFilter, codeFilter, familyFilter, callback) {
  let query = `
    SELECT prod.*
    FROM productos prod
    WHERE 1=1
    AND EXISTS (SELECT 1 FROM prices p WHERE p.code = prod.id_mcodbarra)
  `;

  // Aplica los filtros de texto
  if (nameFilter && nameFilter.trim()) {
    query += ` AND LOWER(prod.descprod) LIKE LOWER('%${nameFilter}%')`;
  }
  if (codeFilter && codeFilter.trim()) {
    query += ` AND LOWER(prod.id_mcodbarra) = LOWER('${codeFilter}')`;
  }
  if (familyFilter && familyFilter.trim()) {
    query += ` AND LOWER(prod.familia) LIKE LOWER('%${familyFilter}%')`;
  }

  query += ` ORDER BY prod.descprod ASC`;

  db.all(query, (err, rows) => {
    if (err) {
      callback(err, null);
    } else {
      // Convertir BigInt a String o Number
      const processedRows = rows.map((row) => {
        const newRow = {};
        for (const key in row) {
          if (typeof row[key] === "bigint") {
            newRow[key] = row[key].toString(); // o usa .valueOf() si prefieres Number
          } else {
            newRow[key] = row[key];
          }
        }
        return newRow;
      });
      callback(null, processedRows);
    }
  });
};

module.exports = {
  getAllProducts,
  getAllPrices,
  initializeDatabase,
  getUniqueCommerces,
  getPricesByProductCode,
  getFilteredProducts,
  resetProductsTable,
  resetPricesTable,
  getPricesWithProductName,
};
