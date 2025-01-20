import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRoutes from './app/routes/AppRoutes';
import { Provider } from 'react-redux';
import { store } from './app/store/store';
import './shared/styles/global.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  </React.StrictMode>,
);
