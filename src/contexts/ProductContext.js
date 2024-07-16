import React, { createContext, useState } from 'react';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([
    {
      id: 1,
      name: 'Paracetamol',
      description: 'Analgésico y antipirético',
      category: 'Analgésicos',
      costPrice: 0.5,
      salePrice: 0.7,
      unitPrice: 0.7,
      expiryDate: '2023-12-31',
      lot: 'A123',
      stock: 100,
      pharmaceuticalLine: 'Bago'
    },
    {
      id: 2,
      name: 'Amoxicilina',
      description: 'Antibiótico',
      category: 'Antibióticos',
      costPrice: 1.0,
      salePrice: 1.2,
      unitPrice: 1.2,
      expiryDate: '2024-06-30',
      lot: 'B456',
      stock: 50,
      pharmaceuticalLine: 'Inti'
    }
  ]);

  const addProduct = (product) => {
    setProducts([...products, { ...product, id: products.length + 1 }]);
  };

  const updateProduct = (id, updatedProduct) => {
    setProducts(products.map(product => product.id === id ? updatedProduct : product));
  };

  const deleteProduct = (id) => {
    setProducts(products.filter(product => product.id !== id));
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
