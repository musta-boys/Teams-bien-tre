import React from "react";
import "../styles/conditions.css";

const Conditions = () => {
  return (
    <div className="conditions-container">
      {/* Header de la page */}
      <header className="conditions-header">
        <h1>Comment passer commande chez nous ?</h1>
        <p>
          Chez Oqata Wellness Solution, nous avons simplifié le processus afin de vous
          offrir une expérience rapide, sécurisée et sans stress. Deux options
          s’offrent à vous :
        </p>
      </header>

      <div className="conditions-content">
        {/* Section Options de Commande */}
        <section className="order-options">
          <div className="option-card">
            <div className="icon">🛒</div>
            <h3>Commande en ligne</h3>
            <p>
              Passez votre commande directement via notre site internet
              officiel.
            </p>
            <span className="highlight-badge">Paiement à la livraison</span>
          </div>

          <div className="option-card">
            <div className="icon">📍</div>
            <h3>Commande via notre base</h3>
            <p>
              Rendez-vous à notre base actuelle située à{" "}
              <strong>la Poste</strong>.
            </p>
            <span className="standard-badge">Procédures standards</span>
          </div>
        </section>

        {/* Section Processus étape par étape */}
        <section className="process-section">
          <h2>Livraison & Paiement</h2>
          <div className="steps-container">
            <div className="step">
              <div className="step-number">1</div>
              <p>
                Chaque client est pris en charge par un{" "}
                <strong>promoteur dédié</strong> pour un suivi personnalisé.
              </p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <p>
                Le paiement s’effectue le jour de la livraison, à la date que
                vous avez choisie.
              </p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <p>
                Un message de confirmation automatique est envoyé sur votre
                téléphone après validation.
              </p>
            </div>
          </div>
        </section>

        {/* Section Logistique */}
        <section className="info-grid">
          <div className="info-box">
            <h3>Zones des servies</h3>
            <ul>
              <li>
                <strong>À Bukavu :</strong> Livraison assurée par notre base
                locale.
              </li>
              <li>
                <strong>Dans les autres villes de la province :</strong> la
                livraison est effectuée dans la ville où se trouve le client.
              </li>
            </ul>
          </div>
          <div className="info-box">
            <h3>Utilisation & accompagnement</h3>
            <p>
            Lors de la remise du produit, chaque famille reçoit un document explicatif avec la (posologie), afin de garantir une utilisation correcte et une efficacité optimale.
             
            </p>
          </div>
        </section>

        {/* Footer Engagement */}
        <footer className="conditions-footer">
          <div className="engagement-banner">
            <p>
              🛡️ <strong>Nos engagements :</strong> Des normes de vente
              professionnelles et strictement respectées. Votre satisfaction est
              notre priorité.
            </p>
          </div>
          <p className="thanks-msg">
            Merci de votre confiance. Ensemble, prenons soin de votre bien-être.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Conditions;
