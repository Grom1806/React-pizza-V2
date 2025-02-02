import React from "react";
import Pagination from "@mui/material/Pagination";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FE5F1E", 
    },
  },
});

const PaginationComponent = ({ currentPage, onPageChange, totalPages }) => {

  return (
    <ThemeProvider theme={theme}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(_, num) => onPageChange(num)}
        color="primary" 
        size="large"
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 3,
          "& .MuiPaginationItem-root": {
            fontWeight: "bold",
          },
        }}
      />
    </ThemeProvider>
  );
};

export default PaginationComponent;
