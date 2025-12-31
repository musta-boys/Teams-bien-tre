import React from 'react';
import ProductCard from './ProductCard';
import '../styles/ProductGallery.css';

const ProductGallery = ({ products, onProductClick }) => {
  return (
    <div className="gallery-container">
      <h2 className="gallery-title">Notre Catalogue des compléments alimentaires</h2>
      <div className="product-grid">
        {products.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onClick={() => onProductClick(product)} 
          />
        ))}
      </div>
    </div>
  );
};
export default ProductGallery;