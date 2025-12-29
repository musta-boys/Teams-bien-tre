import React, { useState } from "react";

export default function ExternalForm() {
  const [order, setOrder] = useState({
    nom: "",
    produit: "Maintenance",
    montant: "",
  });
  const [status, setStatus] = useState(null);

  const sendOrder = (e) => {
    e.preventDefault();

    // On utilise BroadcastChannel pour envoyer les données à l'ERP
    const bc = new BroadcastChannel("flux_commandes");
    bc.postMessage({
      nom: order.nom,
      produit: order.produit,
      montant: Number(order.montant),
    });

    setStatus("Commande envoyée !");
    setOrder({ nom: "", produit: "Maintenance", montant: "" });
    setTimeout(() => setStatus(null), 3000);
  };

  return (
    <div
      style={{
        padding: "20px",
        background: "#121214",
        borderRadius: "12px",
        border: "1px solid #27272a",
        width: "300px",
      }}
    >
      <h3 style={{ color: "#10b981", marginTop: 0 }}>Saisie Express</h3>
      <form onSubmit={sendOrder}>
        <input
          style={inputStyle}
          placeholder="Nom Client"
          value={order.nom}
          onChange={(e) => setOrder({ ...order, nom: e.target.value })}
          required
        />
        <select
          style={inputStyle}
          value={order.produit}
          onChange={(e) => setOrder({ ...order, produit: e.target.value })}
        >
          <option>Maintenance</option>
          <option>Audit</option>
          <option>Logiciel</option>
        </select>
        <input
          type="number"
          style={inputStyle}
          placeholder="Prix HT"
          value={order.montant}
          onChange={(e) => setOrder({ ...order, montant: e.target.value })}
          required
        />
        <button type="submit" style={btnStyle}>
          Transmettre à l'ERP
        </button>
      </form>
      {status && (
        <p
          style={{ color: "#10b981", fontSize: "0.8rem", textAlign: "center" }}
        >
          {status}
        </p>
      )}
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  background: "#18181b",
  border: "1px solid #27272a",
  color: "white",
  borderRadius: "6px",
};
const btnStyle = {
  width: "100%",
  padding: "10px",
  background: "#10b981",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
};
