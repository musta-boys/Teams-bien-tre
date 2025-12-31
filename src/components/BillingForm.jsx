// src/components/BillingForm.js
import React from "react";
import { CheckCircle, UserCheck } from "lucide-react"; // Ajout d'une icône
import Receipt from "./Receipt";
import "./BillingForm.css";

export default function BillingForm({
  formData,
  setFormData,
  onSubmit,
  lastInvoice,
}) {
  return (
    <div className="billing-view">
      <div className="billing-header">
        <h1>Génération de Bordereau</h1>
      </div>
      <div className="billing-content">
        <form className="billing-form-card" onSubmit={onSubmit}>
          <h3>Détails du paiement</h3>

          <div className="input-group">
            <div className="input-with-label">
              <label>Client</label>
              <input
                className="form-input"
                placeholder="Nom du client"
                value={formData.clientNom}
                onChange={(e) =>
                  setFormData({ ...formData, clientNom: e.target.value })
                }
                required
              />
            </div>

            <div className="input-with-label">
              <label>Promoteur</label>
              <input
                className="form-input highlight-vendeur" // On ajoute une classe pour le voir
                placeholder="Nom du promoteur"
                value={formData.VenteNom}
                onChange={(e) =>
                  setFormData({ ...formData, VenteNom: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="input-with-label">
            <label>Adresse de livraison</label>
            <input
              className="form-input"
              placeholder="Adresse"
              value={formData.adresse}
              onChange={(e) =>
                setFormData({ ...formData, adresse: e.target.value })
              }
            />
          </div>

          <div className="input-group">
            <div className="input-with-label">
              <label>Produit</label>
              <input
                className="form-input"
                placeholder="Désignation"
                value={formData.produitNom}
                onChange={(e) =>
                  setFormData({ ...formData, produitNom: e.target.value })
                }
              />
            </div>

            <div className="input-with-label">
              <label>Montant total ($)</label>
              <input
                className="form-input"
                type="number"
                placeholder="0.00"
                value={formData.prixHT}
                onChange={(e) =>
                  setFormData({ ...formData, prixHT: e.target.value })
                }
              />
            </div>
          </div>

          <button type="submit" className="btn-validate">
            <CheckCircle size={18} /> Valider & Imprimer le Bordereau
          </button>
        </form>

        <div className="receipt-preview-section">
          {lastInvoice ? (
            <Receipt data={lastInvoice} />
          ) : (
            <div className="empty-receipt-msg">
              Le reçu s'affichera ici après validation
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
