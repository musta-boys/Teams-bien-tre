import React from 'react';
import '../styles/ProductCard.css';

const ProductCard = ({ product, onClick }) => {
  return (
    <div className="card" onClick={onClick}>
      <div className="card-image">
        <img src={product.image} alt={product.nom} />
        <span className="badge">{product.categorie}</span>
      </div>
      <div className="card-info">
        <h3>{product.nom}</h3>
        <p className="short-desc">{product.description}</p>
        <div className="card-footer">
          <span className="price">{product.prix} $</span>
          <button className="view-btn">Détails</button>
        </div>
      </div>
    </div>
  );
};
export default ProductCard;