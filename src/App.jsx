import React, { useState, useEffect, useMemo } from "react";
import { Bell } from "lucide-react";
import Sidebar from "./components/Sidebar";
import DashboardView from "./components/DashboardView";
import OrderList from "./components/OrderList";
import BillingForm from "./components/BillingForm";
import HistoryTable from "./components/HistoryTable";
import OrderForm from "./components/OrderForm";
import "./App.css";

// URL de ton backend
const API_URL = "https://my-node-api-8frq.onrender.com";

export default function App() {
  const [currentView, setCurrentView] = useState("dashboard");
  const [alert, setAlert] = useState(null);
  const [externalOrders, setExternalOrders] = useState([]);
  const [lastInvoice, setLastInvoice] = useState(null);
  const [history, setHistory] = useState(() =>
    JSON.parse(localStorage.getItem("erp_history") || "[]")
  );

  const [formData, setFormData] = useState({
    id: "",
    clientNom: "",
    VenteNom: "",
    produitNom: "",
    prixHT: "",
    adresse: "",
    telephone: "",
    quantite: "1",
  });

  useEffect(() => {
    localStorage.setItem("erp_history", JSON.stringify(history));
  }, [history]);

  // --- NOUVELLE LOGIQUE : RECUPERATION API ---
  const fetchExternalOrders = async () => {
    try {
      const response = await fetch(API_URL);
      if (response.ok) {
        const data = await response.json();

        // On compare si on a de nouvelles commandes pour afficher l'alerte
        if (data.length > externalOrders.length) {
          setAlert("Nouvelle commande reçue via le Web !");
          setTimeout(() => setAlert(null), 5000);
        }
        setExternalOrders(data);
      }
    } catch (error) {
      console.error("Impossible de récupérer les commandes web", error);
    }
  };

  useEffect(() => {
    fetchExternalOrders(); // Au chargement
    const interval = setInterval(fetchExternalOrders, 20000); // Toutes les 20 secondes
    return () => clearInterval(interval);
  }, [externalOrders.length]);
  // ------------------------------------------

  const validateSale = (e) => {
    e.preventDefault();
    const invoice = {
      id: formData.id || `FAC-${Date.now().toString().slice(-3)}`,
      date: new Date().toLocaleDateString("fr-FR"),
      ...formData,
      totalTTC: Number(formData.prixHT),
    };
    setHistory([invoice, ...history]);
    setLastInvoice(invoice);

    // Supprime localement de la liste visuelle
    setExternalOrders((prev) => prev.filter((o) => o.id !== formData.id));

    setAlert("Vente enregistrée avec succès !");
    setTimeout(() => setAlert(null), 3000);
  };

  const chartData = useMemo(() => {
    const groups = history.reduce((acc, curr) => {
      acc[curr.date] = (acc[curr.date] || 0) + curr.totalTTC;
      return acc;
    }, {});
    return Object.keys(groups)
      .map((date) => ({ name: date, montant: groups[date] }))
      .reverse();
  }, [history]);

  return (
    <div className="app-container">
      {alert && (
        <div className="alert-toast">
          <Bell size={18} /> {alert}
        </div>
      )}

      <Sidebar
        currentView={currentView}
        setCurrentView={setCurrentView}
        externalCount={externalOrders.length}
      />

      <main className="main-content">
        {currentView === "dashboard" && (
          <DashboardView
            history={history}
            chartData={chartData}
            externalCount={externalOrders.length}
          />
        )}

        {currentView === "external" && (
          <OrderList
            orders={externalOrders}
            onProcess={(order) => {
              setFormData({
                id: order.id,
                clientNom: order.nom,
                telephone: order.telephone,
                produitNom: order.produit,
                prixHT: order.montant,
                adresse: order.adresse,
                quantite: order.quantite,
                VenteNom: "", // L'utilisateur le remplira dans le Dashboard
              });
              setCurrentView("billing");
            }}
          />
        )}

        {currentView === "billing" && (
          <BillingForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={validateSale}
            lastInvoice={lastInvoice}
          />
        )}

        {currentView === "history" && <HistoryTable history={history} />}
        {currentView === "client-view" && <OrderForm />}
      </main>
    </div>
  );
}
