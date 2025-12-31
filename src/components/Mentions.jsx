import React from "react";
import Belle from "../images/mutab.png";
import "../styles/Mentions.css";

const Mentions = () => {
  return (
    <div className="portfolio-container">
      {/* Section Introduction : Split Layout */}
      <section className="portfolio-hero">
        <div className="hero-left">
          <div className="image-frame">
            <img src={Belle} alt="Earth's Creation" className="portfolio-img" />
          </div>
        </div>

        <div className="hero-right">
          <span className="brand-label">Leader Nutraceutique</span>
          <h1>Earth's Creation USA</h1>
          <div className="hero-description">
            <p>
              Un leader mondial en supplément nutritionnels de qualité supérieur
              Fondée en 2001, Earth's Creation USA est rapidement devenue un
              leader mondial de confiance dans l'industrie des nutraceutiques
              (produits de santé naturels), offrant une large gamme de produits
              de santé naturels de qualité supérieure. Avec un engagement envers
              l'excellence et l'innovation, Earth's Creation se consacre à
              l'amélioration de la santé et du bien-être de millions de
              personnes dans le monde, et ses produits sont désormais
              disponibles dans plus de 150 pays.{" "}
              <strong>
                Pourquoi nous avons choisi Earth's Creation? Qualité et Pureté
                Inégalées
              </strong>
            </p>
            <p className="intro-text">
              <strong>
                Earth's Creation est un producteur biologique certifié aux
                États-Unis,{" "}
              </strong>{" "}
              garantissant que chaque produit est formulé avec les meilleurs
              ingrédients naturels.
            </p>
            <p className="intro-text">
              Leur usine de fabrication de pointe suit des directives strictes
              de Bonnes Pratiques de Fabrication (GMP), garantissant que chaque
              supplément répond aux normes les plus élevées de sécurité, de
              puissance et de qualité.
            </p>
          </div>
        </div>
      </section>

      {/* Section Détails : Grille en bas */}
      <section className="portfolio-details">
        <div className="details-header">
          <h2>Nos Engagements & Certifications</h2>
          <div className="underline"></div>
        </div>

        <div className="portfolio-grid">
          <div className="detail-item">
            <span className="number">01</span>
            <h3>Installation approuvée par la FDA pour une Confiance Ultime</h3>
            <p>
              L'installation de production de l'entreprise est approuvée par la
              United States Food and Drug Administration (USFDA), gage de
              qualité.
            </p>
            <p>
              la référence absolue en matière de sécurité des consommateurs et
              d'assurance qualité.
            </p>
          </div>

          <div className="detail-item">
            <span className="number">02</span>
            <h3>Engagement envers l'Inclusivité Certifié Halal et kosher</h3>
            <p>
              Les produits Earth's Creation sont conçus pour répondre à divers
              besoins alimentaires. Les certifications Halal et kosher
            </p>
            <p>
              garantissent que leurs suppléments sont conformes aux lois
              alimentaires islamiques et juives, les rendant accessibles et
              dignes de confiance pour des personnes de tous horizons.
            </p>
          </div>

          <div className="detail-item">
            <span className="number">03</span>
            <h3>Normes Reconnues Internationalement</h3>
            <p>
              Leurs produits sont également certifiés ISO, ce qui signifie que
              l'entreprise adhère à des processus internationalement reconnus
              qui garantissent une qualité,
            </p>
            <p>
              une fiabilité et une sécurité constantes. Cette certification
              rigoureuse reflète l'engagement d'Earth's Creation à établir la
              référence dans l'industrie des nutraceutiques.
            </p>
          </div>
        </div>
        <h3>Recherche et Expertise Innovantes</h3>
        <p>
          Avec une équipe d'experts de premier plan dans l'industrie, Earth's
          Creation ne se contente pas de suivre les tendances, elle les pionne.
          Leurs scientifiques et chercheurs travaillent constamment pour créer
          des formules innovantes basées sur les dernières avancées de la
          science de la santé. Chaque produit est élaboré dans le but
          d'optimiser la santé et la vitalité, du renforcement de la fonction
          immunitaire à l'amélioration de la clarté mentale et la promotion du
          bien-être général.
        </p>
        <p>
          <strong>Impact Mondial, Confiance Locale </strong> Les suppléments
          Earth's Creation sont reconnus par les professionnels de la santé et
          les consommateurs du monde entier. Le nom Earth's Creation est
          synonyme de fiabilité, d'intégrité et de qualité inégalée. Leur
          capacité à fournir des solutions nutritionnelles de pointe dans plus
          de 150 pays témoigne de leur portée mondiale et de leur réputation
          d'excellence.
        </p>

        <footer className="portfolio-footer">
          <div className="footer-content">
            <h3>Impact Mondial, Confiance Locale</h3>
            <p>
              Le nom Earth's Creation est synonyme de fiabilité, d'intégrité et
              d'excellence à travers le monde entier.
            </p>
          </div>
        </footer>
      </section>
    </div>
  );
};

export default Mentions;
