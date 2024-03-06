import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';

// Styles
import './index.scss';

// Redux
import store from './store';

// Pages
import App from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
