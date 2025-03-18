import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Cart from '../Cart';
import Home from '../Home';
import NotFound from '../NotFound';
import '@/scss/app.scss';
import FullPizza from '../FullPizza';
const pageVariants = {
  initial: { opacity: 0, scale: 0.95, y: 30 },
  animate: { 
    opacity: 1, 
    scale: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  },
  exit: { 
    opacity: 0, 
    scale: 1.05, 
    y: -30, 
    transition: { duration: 0.4, ease: "easeIn" } 
  },
};


 function AnimatedRoutes() {
  const location = useLocation();

  return (
<AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div 
              initial="initial" 
              animate="animate" 
              exit="exit" 
              variants={pageVariants}
            >
              <Home />
            </motion.div>
          }
        />
        <Route 
          path="/pizza/:id"
          element={
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageVariants}
            >
              <FullPizza />
            </motion.div>
          }
        />
        
        <Route
          path="/cart"
          element={
            <motion.div 
              initial="initial" 
              animate="animate" 
              exit="exit" 
              variants={pageVariants}
            >
              <Cart />
            </motion.div>
          }
        />
        <Route
          path="*"
          element={
            <motion.div 
              initial="initial" 
              animate="animate" 
              exit="exit" 
              variants={pageVariants}
            >
              <NotFound />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}
export default AnimatedRoutes;

