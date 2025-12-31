import React, { useState, useEffect, useMemo } from "react";
import {
  LayoutDashboard, Receipt, FileSpreadsheet, Wallet, Bell, Globe,
  ShoppingCart, CheckCircle, ArrowUpRight
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
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
    dateLivraison: "",
    telephone: "",
    quantite: "1"
  });

  useEffect(() => {
    localStorage.setItem("erp_history", JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    const bc = new BroadcastChannel("flux_commandes");
    bc.onmessage = (event) => {
      const newOrder = {
        id: `WEB-${Date.now().toString().slice(-4)}`,
        dateReception: new Date().toLocaleString("fr-FR"),
        ...event.data, // Contient nom, telephone, produit, detailsMultiples, montant, quantite, adresse, dateLivraison
        status: "Nouveau",
      };
      setExternalOrders((prev) => [newOrder, ...prev]);
      setAlert(`Nouvelle commande : ${event.data.nom}`);
      setTimeout(() => setAlert(null), 5000);
    };
    return () => bc.close();
  }, []);

  const validateSale = (e) => {
    e.preventDefault();
    const invoice = {
      id: formData.id || `FAC-${Date.now().toString().slice(-3)}`,
      date: new Date().toLocaleDateString("fr-FR"),
      clientNom: formData.clientNom,
      VenteNom: formData.VenteNom,
      produitNom: formData.produitNom,
      totalTTC: Number(formData.prixHT),
      adresse: formData.adresse,
      telephone: formData.telephone,
      quantite: formData.quantite
    };
    setHistory([invoice, ...history]);
    setLastInvoice(invoice);
    // Supprimer de la liste des commandes entrantes une fois traité
    setExternalOrders(externalOrders.filter((o) => o.id !== formData.id));
  };

  const chartData = useMemo(() => {
    const groups = history.reduce((acc, curr) => {
      acc[curr.date] = (acc[curr.date] || 0) + curr.totalTTC;
      return acc;
    }, {});
    return Object.keys(groups).map((date) => ({ name: date, montant: groups[date] })).reverse();
  }, [history]);

  return (
    <div className="app-container">
      {alert && <div className="alert-toast"><Bell size={18} /> {alert}</div>}

      <aside className="sidebar">
        <div className="sidebar-logo"><Wallet size={20} color="#10b981" /><span className="logo-text">Teams bien-être</span></div>
        <nav className="nav-menu">
          <SidebarItem icon={<LayoutDashboard />} label="Dashboard" active={currentView === "dashboard"} onClick={() => setCurrentView("dashboard")} />
          <SidebarItem icon={<Globe />} label="Flux Web" active={currentView === "external"} onClick={() => setCurrentView("external")} count={externalOrders.length} />
          <SidebarItem icon={<Receipt />} label="Facturation" active={currentView === "billing"} onClick={() => setCurrentView("billing")} />
          <SidebarItem icon={<FileSpreadsheet />} label="Historique" active={currentView === "history"} onClick={() => setCurrentView("history")} />
        </nav>
      </aside>

      <main className="main-content">
        {currentView === "dashboard" && <DashboardView history={history} chartData={chartData} externalCount={externalOrders.length} />}

        {currentView === "external" && (
          <div className="view-container">
            <h1>Commandes Entrantes</h1>
            <div className="orders-list">
              {externalOrders.map((order) => (
                <div key={order.id} className="order-card">
                  <div className="order-info">
                    <div className="icon-web"><ShoppingCart color="white" size={20} /></div>
                    <div>
                      <h3>{order.nom} <small style={{color: '#94a3b8'}}>({order.telephone})</small></h3>
                      <p>{order.produit} x{order.quantite} — {order.adresse}</p>
                      {order.detailsMultiples && <p style={{fontSize: '0.8rem', color: '#10b981'}}>Note: {order.detailsMultiples}</p>}
                    </div>
                  </div>
                  <div className="order-actions">
                    <span className="price-tag">{order.montant} $</span>
                    <button className="btn-primary" onClick={() => {
                        setFormData({
                          id: order.id,
                          clientNom: order.nom,
                          VenteNom: "", 
                          produitNom: order.produit,
                          prixHT: order.montant,
                          adresse: order.adresse,
                          telephone: order.telephone,
                          quantite: order.quantite,
                          dateLivraison: order.dateLivraison
                        });
                        setCurrentView("billing");
                    }}>Traiter</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentView === "billing" && (
          <div className="view-container">
            <h1>Génération de Bordereau</h1>
            <div className="billing-grid">
              <form className="billing-form" onSubmit={validateSale}>
                <input className="form-input" placeholder="Nom Client" value={formData.clientNom} onChange={(e) => setFormData({ ...formData, clientNom: e.target.value })} required />
                <input className="form-input" placeholder="Nom du Vendeur (Promoteur)" value={formData.VenteNom} onChange={(e) => setFormData({ ...formData, VenteNom: e.target.value })} required />
                <input className="form-input" placeholder="Téléphone" value={formData.telephone} onChange={(e) => setFormData({ ...formData, telephone: e.target.value })} />
                <input className="form-input" placeholder="Adresse" value={formData.adresse} onChange={(e) => setFormData({ ...formData, adresse: e.target.value })} required />
                <input className="form-input" placeholder="Produit" value={formData.produitNom} onChange={(e) => setFormData({ ...formData, produitNom: e.target.value })} required />
                <div style={{display: 'flex', gap: '10px'}}>
                    <input className="form-input" type="number" placeholder="Quantité" value={formData.quantite} onChange={(e) => setFormData({ ...formData, quantite: e.target.value })} required />
                    <input className="form-input" type="number" placeholder="Montant Total ($)" value={formData.prixHT} onChange={(e) => setFormData({ ...formData, prixHT: e.target.value })} required />
                </div>
                <button type="submit" className="btn-primary"><CheckCircle size={18} /> Générer le Reçu</button>
              </form>

              {lastInvoice && (
                <div id="printable-receipt" className="ogata-receipt">
                  <div className="receipt-header">
                    <span className="receipt-number">{lastInvoice.id}</span>
                    <h2 className="receipt-title">BORDEREAU</h2>
                    <p className="receipt-location">Commune d'Ibanda ville : Bukavu Sud-Kivu (RDC)</p>
                  </div>
                  <div className="receipt-section">
                    <h3>Informations générales</h3>
                    <p><strong>Nom Client:</strong> {lastInvoice.clientNom}</p>
                    <p><strong>Téléphone:</strong> {lastInvoice.telephone}</p>
                    <p><strong>Promoteur:</strong> {lastInvoice.VenteNom}</p>
                    <p><strong>Adresse:</strong> {lastInvoice.adresse}</p>
                  </div>
                  <div className="receipt-section">
                    <h3>Détails</h3>
                    <table className="receipt-table">
                      <thead><tr><th>QTE</th><th>NOM PRODUIT</th><th>PRIX</th></tr></thead>
                      <tbody>
                        <tr>
                          <td>{lastInvoice.quantite}</td>
                          <td>{lastInvoice.produitNom}</td>
                          <td>{lastInvoice.totalTTC}$</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="receipt-footer"><div className="signature">Signatures</div></div>
                  <button className="btn-print-action" onClick={() => window.print()}>Imprimer PDF</button>
                </div>
              )}
            </div>
          </div>
        )}

        {currentView === "history" && (
            <div className="view-container">
                <h1>Journal des Ventes</h1>
                <table className="data-table">
                    <thead><tr><th>ID</th><th>Client</th><th>Produit</th><th>Date</th><th>Montant</th></tr></thead>
                    <tbody>
                        {history.map((h) => (
                            <tr key={h.id}>
                                <td>{h.id}</td>
                                <td>{h.clientNom}</td>
                                <td>{h.produitNom}</td>
                                <td>{h.date}</td>
                                <td>{h.totalTTC}$</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )}
      </main>
    </div>
  );
}

// Composants de support (DashboardView, SidebarItem) identiques à votre code initial avec les props passées.
function DashboardView({ history, chartData, externalCount }) {
    const total = history.reduce((acc, curr) => acc + curr.totalTTC, 0);
    return (
      <div className="view-container">
        <div className="stats-grid">
          <div className="stat-card">
            <p>Chiffre d'Affaires</p>
            <h2>{total.toLocaleString()} $ <ArrowUpRight color="#10b981" /></h2>
          </div>
          <div className="stat-card">
            <p>Flux Web en attente</p>
            <h2 style={{ color: "#f43f5e" }}>{externalCount}</h2>
          </div>
        </div>
        <div className="chart-box">
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
              <XAxis dataKey="name" stroke="#a1a1aa" fontSize={12} />
              <YAxis stroke="#a1a1aa" fontSize={12} />
              <Tooltip />
              <Area type="monotone" dataKey="montant" stroke="#10b981" fill="#10b981" fillOpacity={0.1} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
}

function SidebarItem({ icon, label, active, onClick, count }) {
    return (
      <div className={`sidebar-item ${active ? "active" : ""}`} onClick={onClick}>
        <div className="side-label">{icon} <span>{label}</span></div>
        {count > 0 && <span className="count-badge">{count}</span>}
      </div>
    );
}