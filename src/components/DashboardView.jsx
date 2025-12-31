import React from "react";
import { ArrowUpRight, TrendingUp, ShoppingBag } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./DashboardView.css";

export default function DashboardView({ history, chartData, externalCount }) {
  // Calcul du chiffre d'affaires total
  const totalCA = history.reduce((acc, curr) => acc + curr.totalTTC, 0);
  // Calcul du nombre total de ventes
  const totalSales = history.length;

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Vue d'ensemble</h1>
        <p className="subtitle">
          Bienvenue sur votre tableau de bord Teams bien-être
        </p>
      </header>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon income">
            <TrendingUp size={20} />
          </div>
          <div className="stat-info">
            <p>Chiffre d'Affaires</p>
            <h2>{totalCA.toLocaleString()} $</h2>
          </div>
          <ArrowUpRight className="trend-icon" color="#10b981" />
        </div>

        <div className="stat-card">
          <div className="stat-icon orders">
            <ShoppingBag size={20} />
          </div>
          <div className="stat-info">
            <p>Commandes </p>
            <h2 style={{ color: externalCount > 0 ? "#f43f5e" : "#fff" }}>
              {externalCount}
            </h2>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon sales">
            <TrendingUp size={20} />
          </div>
          <div className="stat-info">
            <p>Ventes Réalisées</p>
            <h2>{totalSales}</h2>
          </div>
        </div>
      </div>

      <div className="chart-section">
        <h3>Évolution des revenus ($)</h3>
        <div className="chart-box">
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#27272a"
                vertical={false}
              />
              <XAxis
                dataKey="name"
                stroke="#a1a1aa"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#a1a1aa"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#18181b",
                  border: "1px solid #27272a",
                  borderRadius: "8px",
                }}
                itemStyle={{ color: "#10b981" }}
              />
              <Area
                type="monotone"
                dataKey="montant"
                stroke="#10b981"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorPrice)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
