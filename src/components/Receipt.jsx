import React from "react";
import { Printer, MapPin, Phone, User, Calendar } from "lucide-react";
import "./Receipt.css";

export default function Receipt({ data }) {
  if (!data) return null;

  return (
    <div className="receipt-wrapper">
      <div id="printable-receipt" className="receipt-card">
        {/* En-tête avec Logo ou Nom de l'entreprise */}
        <div className="receipt-header">
          <div className="company-info">
            <h2 className="company-name">TEAMS BIEN-ÊTRE</h2>
            <p className="company-tagline">Santé & Beauté Naturelle</p>
          </div>
          <div className="receipt-number-box">
            <span>N° FACTURE</span>
            <strong>{data.id}</strong>
          </div>
        </div>

        <div className="receipt-divider"></div>

        {/* Informations de livraison et client */}
        <div className="receipt-meta">
          <div className="meta-item">
            <Calendar size={14} />
            <span>
              Date: <strong>{data.date}</strong>
            </span>
          </div>
          <div className="meta-item">
            <MapPin size={14} />
            <span>
              Lieu: <strong>Bukavu, RDC</strong>
            </span>
          </div>
        </div>

        <div className="client-details">
          <div className="detail-box">
            <p className="label">CLIENT</p>
            <div className="info-with-icon">
              <User size={16} />
              <strong>{data.clientNom}</strong>
            </div>
            {data.adresse && <p className="sub-info">{data.adresse}</p>}
          </div>
          <div className="detail-box">
            <p className="label">PROMOTEUR</p>
            <strong>{data.VenteNom}</strong>
          </div>
        </div>

        {/* Tableau des produits */}
        <table className="receipt-table">
          <thead>
            <tr>
              <th>DESCRIPTION</th>
              <th className="text-center">QTE</th>
              <th className="text-right">TOTAL</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <span className="product-name">{data.produitNom}</span>
                <p className="product-desc">
                  Produit authentique Teams Bien-être
                </p>
              </td>
              <td className="text-center">{data.quantite || 1}</td>
              <td className="text-right">{data.totalTTC} $</td>
            </tr>
          </tbody>
        </table>

        {/* Total Final */}
        <div className="total-container">
          <div className="total-row">
            <span>Sous-total</span>
            <span>{data.totalTTC} $</span>
          </div>
          <div className="total-row grand-total">
            <span>TOTAL NET À PAYER</span>
            <span>{data.totalTTC} $</span>
          </div>
        </div>

        {/* Signatures */}
        <div className="signature-section">
          <div className="signature-box">
            <p>Le Client</p>
            <div className="sig-line"></div>
          </div>
          <div className="signature-box">
            <p>Pour l'Entreprise</p>
            <div className="sig-line"></div>
          </div>
        </div>

        <div className="receipt-footer">
          <p>Toute marchandise vendue n'est pas reprise.</p>
          <p className="thank-you">Merci de votre confiance !</p>
        </div>
      </div>

      <button className="btn-print-receipt" onClick={() => window.print()}>
        <Printer size={18} /> Imprimer le Bordereau
      </button>
    </div>
  );
}
