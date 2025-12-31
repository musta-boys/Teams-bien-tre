import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h3>CLUB bien-être</h3>
          <p>
            Avec Oqata Wellness solution profitez chaque jours des produits de
            haute qualité.
          </p>
        </div>

        <div className="footer-section contact">
          <h4>Contact d'Urgence</h4>
          <p>📞 +243 971534738</p>
          <p>✉️ clubsante2025.info@gmail.com</p>
          <p>📍 Avenue kibombo la poste ISP: bukavu </p>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} CLUB bien-être | Conçu pour les
        professionnels de santé
      </div>
    </footer>
  );
};

export default Footer;
