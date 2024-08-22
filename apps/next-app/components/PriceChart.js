// "use client";
// import React, { useEffect, useState } from "react";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from "recharts";
// import moment from "moment";
// import useFetchPricesByProduct from "../hooks/useFetchPricesByProduct"; // Ajusta la ruta según sea necesario

// const PriceChart = ({ productCode, commerceName }) => {
//   const { prices, loading, error, fetchPricesByProduct } =
//     useFetchPricesByProduct();
//   const [series, setSeries] = useState([]);

//   useEffect(() => {
//     if (productCode) {
//       fetchPricesByProduct(productCode);
//     }
//   }, [productCode]);

//   useEffect(() => {
//     if (prices) {
//       const newSeries = groupByCommerce(prices);
//       console.log("newSeries", newSeries);
//       setSeries(newSeries);
//     }
//   }, [prices]);

//   const groupByCommerce = (data) => {
//     // Crea un objeto para almacenar los datos agrupados por comercio
//     const commerceMap = {};

//     data.forEach((item) => {
//       const { commerce, date, price } = item;

//       // Si el comercio no está en el mapa, lo agrega
//       if (!commerceMap[commerce]) {
//         commerceMap[commerce] = [];
//       }

//       // Agrega el precio y la fecha a la lista del comercio
//       commerceMap[commerce].push({
//         date: date,
//         price: price,
//       });
//     });

//     // Convierte el mapa a un array de objetos y ordena por la cantidad de datos en `data`
//     const result = Object.keys(commerceMap)
//       .map((commerce) => ({
//         name: commerce,
//         data: commerceMap[commerce],
//       }))
//       .sort((a, b) => b.data.length - a.data.length); // Ordena de mayor a menor cantidad de datos

//     return result;
//   };

//   if (loading) return <p>Cargando gráficos...</p>;
//   if (error)
//     return (
//       <div>
//         <h6>Sin gráfico de precios</h6>
//       </div>
//     );

//   return (
//     <ResponsiveContainer width="100%" height={400}>
//       <LineChart>
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis
//           dataKey="date"
//           type="category"
//           name="date"
//           tickFormatter={(value) => moment(value).format("DD-MM-YYYY")}
//         />
//         <YAxis dataKey="price" />
//         <Tooltip />
//         <Legend />

//         {series.map((s) => (
//           <Line
//             key={s.name} // Clave única para cada serie
//             type="monotone"
//             dataKey="price"
//             data={s.data}
//             name={s.name}
//             stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`} // Color aleatorio
//           />
//         ))}
//       </LineChart>
//     </ResponsiveContainer>
//   );
// };

// export default PriceChart;

"use client";
import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import moment from "moment";
import useFetchPricesByProduct from "../hooks/useFetchPricesByProduct"; // Ajusta la ruta según sea necesario
import { Typography } from "@mui/material";

// Registra los componentes necesarios en Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

const PriceChart = ({ productCode }) => {
  const { prices, loading, error, fetchPricesByProduct } =
    useFetchPricesByProduct();
  const [chartData, setChartData] = useState({ datasets: [] });

  useEffect(() => {
    if (productCode) {
      fetchPricesByProduct(productCode);
    }
  }, [productCode]);

  useEffect(() => {
    if (prices) {
      const newChartData = prepareChartData(prices);
      setChartData(newChartData);
    }
  }, [prices]);

  const generateRandomColor = () => {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    return {
      borderColor: randomColor,
      backgroundColor: `${randomColor}33`, // Agrega opacidad al color de fondo (50%)
    };
  };

  const prepareChartData = (data) => {
    const commerceMap = {};

    data.forEach((item) => {
      const { commerce, date, price } = item;

      if (!commerceMap[commerce]) {
        const color = generateRandomColor();
        commerceMap[commerce] = {
          label: commerce,
          data: [],
          borderColor: color.borderColor,
          backgroundColor: color.borderColor,
        };
      }

      commerceMap[commerce].data.push({
        x: moment(date).format("DD-MM-YYYY"),
        y: price,
      });
    });

    const datasets = Object.values(commerceMap).sort(
      (a, b) => b.data.length - a.data.length
    );

    return {
      datasets,
    };
  };

  const formatCurrency = (value) => {
    return value.toLocaleString("es-CL", {
      style: "currency",
      currency: "CLP",
    });
  };

  if (loading) return <p>Cargando gráficos...</p>;
  if (error) return <Typography>Sin gráfico de precios</Typography>;

  return (
    <>
      <Typography>Gráfico de precios</Typography>

      <Line
        data={chartData}
        options={{
          responsive: true,
          aspectRatio: 2,

          plugins: {
            legend: {
              position: "top",
            },
            tooltip: {
              callbacks: {
                label: (context) =>
                  `${context.dataset.label}: ${formatCurrency(context.raw.y)}`,
              },
            },
          },
          scales: {
            x: {
              type: "category",
              title: {
                display: true,
                text: "Fecha",
              },
              ticks: {
                autoSkip: true,
                maxTicksLimit: 10,
              },
            },
            y: {
              title: {
                display: true,
                text: "Precio",
              },
              ticks: {
                callback: function (value) {
                  return formatCurrency(value);
                },
              },
            },
          },
        }}
      />
    </>
  );
};

export default PriceChart;
