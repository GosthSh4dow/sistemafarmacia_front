import React from 'react';
import AppRouter from './AppRouter';
import { ProductProvider } from './contexts/ProductContext';

const App = () => {
  return (
    <ProductProvider>
      <div className="App">
        <AppRouter />
      </div>
    </ProductProvider>
  );
};

export default App;