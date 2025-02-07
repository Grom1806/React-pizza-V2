import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { StrictMode } from 'react';
import App from './App.jsx';
import { store } from './redux/store.js';
import { SpeedInsights } from "@vercel/speed-insights/react"

createRoot(document.getElementById('root')).render(
  <SpeedInsights>
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </StrictMode>
  </SpeedInsights> 
);
