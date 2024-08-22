// PrintButton.js
import React from 'react';
import { useReactToPrint } from 'react-to-print';
import { Print as PrintIcon } from '@mui/icons-material';
import { IconButton } from '@mui/material';

// Componente que recibe el componente padre para imprimir
const PrintButton = ({ componentRef }) => {


  const handlePrint = useReactToPrint({

    content: () => componentRef.current,
  });
  // const handlePrint = () => {
  //   console.log(componentRef);
  //   componentRef.current.print();
  // }

  return (
    <IconButton onClick={handlePrint} color="primary">
      <PrintIcon />
    </IconButton>
  );
};

export default PrintButton;
