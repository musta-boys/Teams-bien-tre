import React, { useState, useEffect, useMemo } from "react";
import { Bell } from "lucide-react";
import Sidebar from "./components/Sidebar";
import DashboardView from "./components/DashboardView";
import OrderList from "./components/OrderList";
import BillingForm from "./components/BillingForm";
import HistoryTable from "./components/HistoryTable";
import OrderForm from "./components/OrderForm";
import "./App.css";

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

  // Sauvegarde automatique de l'historique dans le navigateur
  useEffect(() => {
    localStorage.setItem("erp_history", JSON.stringify(history));
  }, [history]);

  // RÉSONANCE : Écoute les commandes envoyées depuis le formulaire client (OrderForm)
  useEffect(() => {
    const bc = new BroadcastChannel("flux_commandes");
    bc.onmessage = (event) => {
      const newOrder = {
        id: `WEB-${Date.now().toString().slice(-4)}`,
        ...event.data,
        dateReception: new Date().toLocaleString("fr-FR"),
      };
      setExternalOrders((prev) => [newOrder, ...prev]);
      setAlert(`Nouvelle commande reçue : ${event.data.nom}`);

      // Faire disparaître l'alerte après 5 secondes
      setTimeout(() => setAlert(null), 5000);
    };
    return () => bc.close();
  }, []);

  // Fonction pour valider une vente et l'ajouter à l'historique
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
    // On retire la commande de la liste "Flux Web" une fois facturée
    setExternalOrders((prev) => prev.filter((o) => o.id !== formData.id));
    setAlert("Vente enregistrée avec succès !");
    setTimeout(() => setAlert(null), 3000);
  };

  // Préparation des données pour le graphique du Dashboard
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
      {/* Toast de notification en haut de l'écran */}
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
        {/* Vue : Tableau de Bord */}
        {currentView === "dashboard" && (
          <DashboardView
            history={history}
            chartData={chartData}
            externalCount={externalOrders.length}
          />
        )}

        {/* Vue : Commandes arrivant du Web */}
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
                VenteNom: order.vendeurNom,
              });
              setCurrentView("billing");
            }}
          />
        )}

        {/* Vue : Formulaire de Facturation / Reçu */}
        {currentView === "billing" && (
          <BillingForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={validateSale}
            lastInvoice={lastInvoice}
          />
        )}

        {/* Vue : Historique complet des ventes */}
        {currentView === "history" && <HistoryTable history={history} />}

        {/* Vue : Le Formulaire que le client voit */}
        {currentView === "client-view" && <OrderForm />}
      </main>
    </div>
  );
}
