const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors()); // Très important pour autoriser Vercel
app.use(express.json());

let baseDeDonneesCommandes = [];

// Route pour le formulaire (POST)
app.post("/commandes", (req, res) => {
  const commande = req.body;
  baseDeDonneesCommandes.unshift(commande); // Ajoute au début de la liste
  res.status(201).send({ message: "Reçu !" });
});

// Route pour l'App React (GET)
app.get("/commandes", (req, res) => {
  res.json(baseDeDonneesCommandes);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Serveur prêt sur le port ${PORT}`));
