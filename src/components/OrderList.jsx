// Dans ton fichier principal React (ex: App.js ou le parent de OrderList)
import React, { useState, useEffect } from "react";

function App() {
  const [externalOrders, setExternalOrders] = useState([]);
  const API_URL = "https://ton-api-backend.onrender.com/commandes";

  // Fonction pour récupérer les commandes depuis l'API
  const fetchOrders = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setExternalOrders(data);
    } catch (error) {
      console.error("Erreur de récupération des commandes:", error);
    }
  };

  // On vérifie les nouvelles commandes toutes les 20 secondes
  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 20000);
    return () => clearInterval(interval);
  }, []);

  // Cette fonction sera passée à ton composant OrderList
  const handleProcessOrder = (order) => {
    // Logique pour transformer la commande en facture (BillingForm)
    console.log("Traitement de la commande:", order);
  };

  // ... le reste de ton rendu avec Sidebar et DashboardView
}
