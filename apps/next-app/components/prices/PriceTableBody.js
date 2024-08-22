import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
} from "@mui/material";


export default function PriceTableBody(props) {
  const { prices } = props;
  // Realiza la llamada a fetchFilterPrices dentro del componente

  return (
    <TableContainer
   

  
    >
      <Table>
        <TableBody>
          {prices.map((item, index) => (
            <TableRow key={index}>
              <TableCell sx={{ width: 100 }}>{item.code}</TableCell>
              <TableCell sx={{ width: 200 }}>{item.product_name}</TableCell>
              <TableCell sx={{ width: 150 }}>{item.commerce}</TableCell>
              <TableCell sx={{ width: 120 }}>
                {item.price.toLocaleString("es-CL", {
                  style: "currency",
                  currency: "CLP",
                })}
              </TableCell>
              <TableCell sx={{ width: 150 }}>
                {new Date(item.date).toLocaleDateString("es-CL")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
