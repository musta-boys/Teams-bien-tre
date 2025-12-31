import React, { useState } from "react";
import ProductGallery from "./ProductGallery";
import ProductModal from "./ProductModal";
import Footer from "./Footer";
import "../styles/Navbar.css";
// import Navbar from "./Navbar";
import productsData from "../data/products.json";

const Navbar = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleOpenDetails = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseDetails = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="app-container">
      {/* <Navbar /> */}

      <main>
        <section className="hero">
          <h1>Catalogue des produits disponible a bukavu</h1>
          <p>
            Consultez les prix et détails de nos produits oqata wellness
            solution en temps réel.
          </p>
        </section>

        <ProductGallery
          products={productsData}
          onProductClick={handleOpenDetails}
        />
      </main>

      <ProductModal product={selectedProduct} onClose={handleCloseDetails} />

      <Footer />
    </div>
  );
};
export default Navbar;
