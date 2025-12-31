import React from "react";
import { ShoppingCart } from "lucide-react";

export default function OrderList({ orders, onProcess }) {
  return (
    <div className="view-container">
      <h1>Commandes Entrantes</h1>
      <div className="orders-list">
        {orders.map((order) => (
          <div key={order.id} className="order-card">
            <div className="order-info">
              <div className="icon-web">
                <ShoppingCart color="white" size={20} />
              </div>
              <div>
                <h3>
                  {order.nom}{" "}
                  <small style={{ color: "#94a3b8" }}>
                    ({order.telephone})
                  </small>
                </h3>
                <p>
                  {order.produit} x{order.quantite} — {order.adresse}
                </p>
              </div>
            </div>
            <div className="order-actions">
              <span className="price-tag">{order.montant} $</span>
              <button className="btn-primary" onClick={() => onProcess(order)}>
                Traiter
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
