import { RootState, useAppDispatch } from '@/redux/store'
import Pagination from '@mui/material/Pagination'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { setCurrentPage } from '../../redux/slices/filterSlice'

const theme = createTheme({
  palette: {
    primary: {
      main: '#FE5F1E',
    },
  },
});

const PaginationComponent: React.FC = () => {
  const { currentPage, totalPages } = useSelector((state: RootState) => state.filter);
  const dispatch = useAppDispatch();

  // Плавная анимация изменения страницы
  const [isPageChanging, setIsPageChanging] = useState(false);

  const handlePageChange = (_: React.ChangeEvent<unknown>, num: number) => {
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
