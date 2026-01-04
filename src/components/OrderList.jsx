import React from "react";
import { ShoppingCart, Phone, MapPin, Tag } from "lucide-react";
// import "./OrderList.css"; // Assure-toi que le fichier CSS existe

export default function OrderList({ orders, onProcess }) {
  return (
    <div className="view-container">
      <div className="view-header">
        <h1>📦 Commandes Entrantes (Web)</h1>
        <p className="subtitle">
          Flux en temps réel depuis votre site de vente
        </p>
      </div>

      <div className="orders-list">
        {orders.length === 0 ? (
          <div className="empty-state">
            <p>Aucune nouvelle commande pour le moment...</p>
          </div>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-info">
                {/* Icône Panier pour identifier la source Web */}
                <div className="icon-web">
                  <ShoppingCart color="white" size={20} />
                </div>

                <div className="details-group">
                  <h3>
                    {order.nom} <span className="order-id">#{order.id}</span>
                  </h3>

                  <div className="info-row">
                    <Phone size={14} />
                    <span>{order.telephone}</span>
                  </div>

                  <div className="info-row">
                    <Tag size={14} />
                    <strong>{order.produit}</strong>
                    <span className="qty-badge">x{order.quantite}</span>
                  </div>

                  <div className="info-row">
                    <MapPin size={14} />
                    <span>{order.adresse}</span>
                  </div>
                </div>
              </div>

              <div className="order-actions">
                <div className="price-display">
                  <span className="label">Total :</span>
                  <span className="price-tag">{order.montant} $</span>
                </div>

                <button
                  className="btn-primary"
                  onClick={() => onProcess(order)}
                >
                  Traiter & Facturer
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
