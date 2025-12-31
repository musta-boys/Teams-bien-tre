import React from "react";
import {
  LayoutDashboard,
  Globe,
  Receipt,
  FileText,
  ShoppingBag,
  LogOut,
} from "lucide-react";
import "./Sidebar.css";

export default function Sidebar({
  currentView,
  setCurrentView,
  externalCount,
}) {
  const menuItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      id: "external",
      label: "Flux Web",
      icon: <Globe size={20} />,
      count: externalCount,
    },
    { id: "billing", label: "Facturation", icon: <Receipt size={20} /> },
    { id: "history", label: "Historique", icon: <FileText size={20} /> },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">TEAMS</div>
        <p>Bien-être ERP</p>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section">
          <p className="section-title">ADMINISTRATION</p>
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${currentView === item.id ? "active" : ""}`}
              onClick={() => setCurrentView(item.id)}
            >
              {item.icon}
              <span>{item.label}</span>
              {item.count > 0 && <span className="badge">{item.count}</span>}
            </button>
          ))}
        </div>

        <div className="nav-section">
          <p className="section-title">EXTERNE</p>
          <button
            className={`nav-item ${
              currentView === "client-view" ? "active" : ""
            }`}
            onClick={() => setCurrentView("client-view")}
          >
            <ShoppingBag size={20} />
            <span>Formulaire Client</span>
          </button>
        </div>
      </nav>

      <div className="sidebar-footer">
        <button className="nav-item logout">
          <LogOut size={20} />
          <span>Mustaboys</span>
        </button>
      </div>
    </aside>
  );
}
