import React, { useState, useEffect, useMemo } from "react";
import {
  LayoutDashboard,
  Receipt,
  FileSpreadsheet,
  Wallet,
  Bell,
  Globe,
  ShoppingCart,
  Printer,
  CheckCircle,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
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
    clientNom: "",
    VenteNom: "",
    clientEmail: "",
    produitNom: "",
    prixHT: "",
    adresse: "",
  });

  useEffect(() => {
    localStorage.setItem("erp_history", JSON.stringify(history));
  }, [history]);

  // Connexion en temps réel
  useEffect(() => {
    const bc = new BroadcastChannel("flux_commandes");
    bc.onmessage = (event) => {
      const newOrder = {
        id: `10${history.length + externalOrders.length + 1}`, // Numérotation type bordereau
        date: new Date().toLocaleString("fr-FR"),
        ...event.data,
        status: "Nouveau",
      };
      setExternalOrders((prev) => [newOrder, ...prev]);
      setAlert(`Nouvelle commande : ${event.data.nom}`);
      setTimeout(() => setAlert(null), 5000);
    };
    return () => bc.close();
  }, [history.length, externalOrders.length]);

  const validateSale = (e) => {
    e.preventDefault();
    const invoice = {
      id: formData.id || `FAC-${Date.now().toString().slice(-3)}`,
      date: new Date().toLocaleDateString("fr-FR"),
      clientNom: formData.clientNom,
      VenteNom: formData.VenteNom,
      clientEmail: formData.clientEmail,
      produitNom: formData.produitNom,
      totalTTC: Number(formData.prixHT),
      adresse: formData.adresse,
    };
    setHistory([invoice, ...history]);
    setLastInvoice(invoice);
    setExternalOrders(
      externalOrders.filter((o) => o.nom !== formData.clientNom)
    );
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
          <Bell size={18} className="animate-bounce" /> {alert}
        </div>
      )}

      <aside className="sidebar">
        <div className="sidebar-logo">
          <Wallet size={20} color="#10b981" />
          <span className="logo-text">Teams bien-être </span>
        </div>
        <nav className="nav-menu">
          <SidebarItem
            icon={<LayoutDashboard />}
            label="Dashboard"
            active={currentView === "dashboard"}
            onClick={() => setCurrentView("dashboard")}
          />
          <SidebarItem
            icon={<Globe />}
            label="Flux Web"
            active={currentView === "external"}
            onClick={() => setCurrentView("external")}
            count={externalOrders.length}
          />
          <SidebarItem
            icon={<Receipt />}
            label="Facturation"
            active={currentView === "billing"}
            onClick={() => setCurrentView("billing")}
          />
          <SidebarItem
            icon={<FileSpreadsheet />}
            label="Historique"
            active={currentView === "history"}
            onClick={() => setCurrentView("history")}
          />
        </nav>
      </aside>

      <main className="main-content">
        {currentView === "dashboard" && (
          <DashboardView
            history={history}
            chartData={chartData}
            externalCount={externalOrders.length}
          />
        )}

        {currentView === "external" && (
          <div className="view-container">
            <h1>Commandes Entrantes</h1>
            <div className="orders-list">
              {externalOrders.map((order) => (
                <div key={order.id} className="order-card">
                  <div className="order-info">
                    <div className="icon-web">
                      <ShoppingCart color="white" size={20} />
                    </div>
                    <div>
                      <h3>{order.nom}</h3>
                      <p>
                        {order.produit} — {order.adresse}
                      </p>
                    </div>
                  </div>
                  <div className="order-actions">
                    <span className="price-tag">{order.montant} $</span>
                    <button
                      className="btn-primary"
                      onClick={() => {
                        setFormData({
                          id: order.id,
                          clientNom: order.nom,
                          VenteNom: order.prenom,
                          clientEmail: order.email,
                          produitNom: order.produit,
                          prixHT: order.montant,
                          Date: order.date,
                          adresse: order.adresse,
                        });
                        setCurrentView("billing");
                      }}
                    >
                      Traiter
                    </button>
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
                <input
                  className="form-input"
                  placeholder="Nom Client"
                  value={formData.clientNom}
                  onChange={(e) =>
                    setFormData({ ...formData, clientNom: e.target.value })
                  }
                  required
                />
                <input
                  className="form-input"
                  placeholder="Nom du Vente"
                  value={formData.VenteNom}
                  onChange={(e) =>
                    setFormData({ ...formData, VenteNom: e.target.value })
                  }
                  required
                />
                <input
                  className="form-input"
                  placeholder="Adresse"
                  value={formData.adresse}
                  onChange={(e) =>
                    setFormData({ ...formData, adresse: e.target.value })
                  }
                  required
                />
                <input
                  className="form-input"
                  placeholder="Produit"
                  value={formData.produitNom}
                  onChange={(e) =>
                    setFormData({ ...formData, produitNom: e.target.value })
                  }
                  required
                />
                <input
                  className="form-input"
                  type="Date"
                  placeholder="Date de livreson"
                  value={formData.Date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  required
                />
                <input
                  className="form-input"
                  type="number"
                  placeholder="Montant"
                  value={formData.prixHT}
                  onChange={(e) =>
                    setFormData({ ...formData, prixHT: e.target.value })
                  }
                  required
                />
                <button type="submit" className="btn-primary">
                  <CheckCircle size={18} /> Générer le Reçu
                </button>
              </form>

              {lastInvoice && (
                <div id="printable-receipt" className="ogata-receipt">
                  <div className="receipt-header">
                    <span className="receipt-number">{lastInvoice.id}</span>
                    <h2 className="receipt-title">BORDEREAU</h2>
                    <p className="receipt-location">
                      Commune d'Ibanda ville : Bukavu Sud-Kivu (RDC)
                    </p>
                  </div>
                  {/* <div className="logo-circle-container">
                    <div className="green-circle">
                      <div className="inner-white-oval"></div>
                      <span className="leaf">🌿</span>
                    </div>
                  </div> */}
                  <div className="receipt-section" >
                    <h3>Informations générales</h3>
                    <p>
                      <strong>Nom :</strong> {lastInvoice.clientNom}
                    </p>
                    <p>
                      <strong>Promoteur :</strong> {lastInvoice.VenteNom}
                    </p>
                    <p>
                      <strong>Adresse :</strong> {lastInvoice.adresse}
                    </p>
                  </div>
                  <div className="receipt-section">
                    <h3>Détails des produits remis</h3>
                    <table className="receipt-table">
                      <thead>
                        <tr>
                          <th>QTE</th>
                          <th>NOM</th>
                          <th>PRIX</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>1</td>
                          <td>{lastInvoice.produitNom}</td>
                          <td>{lastInvoice.totalTTC}$</td>
                          <td>{lastInvoice.date}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="receipt-footer">
                    <div className="signature">Signatures</div>
                  </div>
                  <button
                    className="btn-print-action"
                    onClick={() => window.print()}
                  >
                    Imprimer PDF
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {currentView === "history" && (
          <div className="view-container">
            <h1>Journal des Ventes</h1>
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Client</th>
                  <th>Promoteur</th>
                  <th>Date</th>
                  <th>Montant</th>
                </tr>
              </thead>
              <tbody>
                {history.map((h) => (
                  <tr key={h.id}>
                    <td>{h.id}</td>
                    <td>{h.clientNom}</td>
                    <td>{h.VenteNom}</td>
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

function DashboardView({ history, chartData, externalCount }) {
  const total = history.reduce((acc, curr) => acc + curr.totalTTC, 0);
  return (
    <div className="view-container">
      <div className="stats-grid">
        <div className="stat-card">
          <p>Chiffre d'Affaires</p>
          <h2>
            {total.toLocaleString()} $ <ArrowUpRight color="#10b981" />
          </h2>
        </div>
        <div className="stat-card">
          <p>Flux Web en attente</p>
          <h2 style={{ color: "#f43f5e" }}>{externalCount}</h2>
        </div>
      </div>
      <div className="chart-box">
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={chartData}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#27272a"
              vertical={false}
            />
            <XAxis dataKey="name" stroke="#a1a1aa" fontSize={12} />
            <YAxis stroke="#a1a1aa" fontSize={12} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="montant"
              stroke="#10b981"
              fill="#10b981"
              fillOpacity={0.1}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function SidebarItem({ icon, label, active, onClick, count }) {
  return (
    <div className={`sidebar-item ${active ? "active" : ""}`} onClick={onClick}>
      <div className="side-label">
        {icon} <span>{label}</span>
      </div>
      {count > 0 && <span className="count-badge">{count}</span>}
    </div>
  );
}
