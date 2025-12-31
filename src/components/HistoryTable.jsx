// src/components/HistoryTable.js
import React from "react";
import { FileText, Download } from "lucide-react";
import "./HistoryTable.css";

export default function HistoryTable({ history }) {
  return (
    <div className="history-container">
      <div className="history-header">
        <h1>Journal des Ventes</h1>
        <button className="btn-export">
          <Download size={16} /> Export CSV
        </button>
      </div>
      <div className="table-responsive">
        <table className="history-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Client</th>
              <th>Produit</th>
              <th>Date</th>
              <th>Montant</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {history.length > 0 ? (
              history.map((item) => (
                <tr key={item.id}>
                  <td className="id-cell">#{item.id}</td>
                  <td>{item.clientNom}</td>
                  <td>
                    {item.produitNom}{" "}
                    <span className="qty-badge">x{item.quantite}</span>
                  </td>
                  <td>{item.date}</td>
                  <td className="amount-cell">{item.totalTTC}$</td>
                  <td>
                    <span className="status-pill">Payé</span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  style={{ textAlign: "center", padding: "2rem" }}
                >
                  Aucune vente enregistrée
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
