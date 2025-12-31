import React, { useState } from "react";
import {
  Send,
  CheckCircle,
  Calendar,
  DollarSign,
  UserCheck,
} from "lucide-react";
import "./OrderForm.css";

// Ton catalogue de produits
const CATALOGUE = [
  { id: 1, nom: "LIVER CARE", prix: 44 },
  { id: 2, nom: "ANDRO-T", prix: 32 },
  { id: 3, nom: "SUPER OMEGA-3", prix: 38 },
  { id: 4, nom: "SUPER FOCUS", prix: 42 },
  { id: 5, nom: "COLON DETOX", prix: 32 },
  { id: 6, nom: "MUSCLE BONE CARE", prix: 36 },
];

export default function OrderForm() {
  const [order, setOrder] = useState({
    nom: "",
    telephone: "",
    produit: "",
    montant: "",
    adresse: "",
    quantite: "1",
    dateLivraison: "",
    vendeurNom: "", // <-- Nouveau champ ajouté
  });
  const [status, setStatus] = useState("idle");

  const handleProductChange = (e) => {
    const produitSelectionne = e.target.value;
    const item = CATALOGUE.find((p) => p.nom === produitSelectionne);
    setOrder({
      ...order,
      produit: produitSelectionne,
      montant: item
        ? (item.prix * parseInt(order.quantite || 1)).toString()
        : "",
    });
  };

  const handleQtyChange = (e) => {
    const newQty = e.target.value;
    const item = CATALOGUE.find((p) => p.nom === order.produit);
    setOrder({
      ...order,
      quantite: newQty,
      montant: item ? (item.prix * parseInt(newQty || 0)).toString() : "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const bc = new BroadcastChannel("flux_commandes");
    bc.postMessage(order);
    setStatus("sent");
    setTimeout(() => {
      setStatus("idle");
      setOrder({
        nom: "",
        telephone: "",
        produit: "",
        montant: "",
        adresse: "",
        quantite: "1",
        dateLivraison: "",
        vendeurNom: "",
      });
    }, 3000);
  };

  return (
    <div className="external-form-container">
      <form className="order-form-card" onSubmit={handleSubmit}>
        {status === "sent" ? (
          <div className="success-msg">
            <CheckCircle size={40} color="#10b981" />
            <h2>Merci ! Commande envoyée.</h2>
          </div>
        ) : (
          <>
            <h2>Teams Bien-être</h2>
            <p>Saisie de commande</p>

            {/* ZONE PROMOTEUR / VENDEUR */}
            <div className="vendeur-input-wrapper">
              <UserCheck className="input-icon-left" size={18} />
              <input
                className="form-input icon-padding"
                placeholder="Nom du Promoteur "
                value={order.vendeurNom}
                onChange={(e) =>
                  setOrder({ ...order, vendeurNom: e.target.value })
                }
                required
              />
            </div>

            <div className="divider-form"></div>

            <input
              className="form-input"
              placeholder="Nom du Client"
              value={order.nom}
              onChange={(e) => setOrder({ ...order, nom: e.target.value })}
              required
            />

            <input
              className="form-input"
              placeholder="Téléphone Client"
              value={order.telephone}
              onChange={(e) =>
                setOrder({ ...order, telephone: e.target.value })
              }
              required
            />

            <select
              className="form-input"
              value={order.produit}
              onChange={handleProductChange}
              required
            >
              <option value="">Sélectionnez un produit...</option>
              {CATALOGUE.map((p) => (
                <option key={p.id} value={p.nom}>
                  {p.nom} - {p.prix}$
                </option>
              ))}
            </select>

            <div className="row">
              <input
                className="form-input"
                type="number"
                placeholder="Qté"
                min="1"
                value={order.quantite}
                onChange={handleQtyChange}
              />
              <div className="readonly-input-wrapper">
                <input
                  className="form-input readonly-field"
                  value={order.montant ? `${order.montant} $` : ""}
                  placeholder="Prix Total"
                  readOnly
                />
                <DollarSign className="input-icon" size={16} />
              </div>
            </div>

            <div className="date-input-group">
              <label>
                <Calendar size={14} /> Date de livraison
              </label>
              <input
                className="form-input"
                type="date"
                value={order.dateLivraison}
                onChange={(e) =>
                  setOrder({ ...order, dateLivraison: e.target.value })
                }
                required
              />
            </div>

            <textarea
              className="form-input"
              placeholder="Adresse complète"
              value={order.adresse}
              onChange={(e) => setOrder({ ...order, adresse: e.target.value })}
              required
            />

            <button type="submit" className="btn-send">
              <Send size={18} /> Envoyer à l'ERP
            </button>
          </>
        )}
      </form>
    </div>
  );
}
