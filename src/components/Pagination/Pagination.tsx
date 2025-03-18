import Pagination from '@mui/material/Pagination';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../../redux/slices/filterSlice';
import { motion } from 'framer-motion';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FE5F1E',
    },
  },
});

const PaginationComponent: React.FC = () => {
  const { currentPage, totalPages } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  // Плавная анимация изменения страницы
  const [isPageChanging, setIsPageChanging] = useState(false);

  const handlePageChange = (_, num) => {
    setIsPageChanging(true);
    dispatch(setCurrentPage(num));

    // Сбрасываем анимацию после смены страницы
    setTimeout(() => setIsPageChanging(false), 300); // Длительность анимации
  };

  return (
    <ThemeProvider theme={theme}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{
          opacity: 1,
          scale: isPageChanging ? 1.05 : 1, // При смене страницы немного увеличивается
          transition: { duration: 0.3, ease: 'easeOut' },
        }}
        exit={{
          opacity: 0,
          scale: 0.9,
          transition: { duration: 0.2, ease: 'easeIn' },
        }}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          mt: 3,
          '& .MuiPaginationItem-root': {
            fontWeight: 'bold',
          },
        }}
      >
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
          size="large"
        />
      </motion.div>
    </ThemeProvider>
  );
};

export default PaginationComponent;
