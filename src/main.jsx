import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { StrictMode } from 'react';
import App from './App.jsx';
import { store } from './redux/store.js';
import { SpeedInsights } from "@vercel/speed-insights/react"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <SpeedInsights>
          <App />
        </SpeedInsights>
      </Provider>
    </BrowserRouter>
  </StrictMode>
);
