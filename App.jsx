import React, { useState } from "react";
import "./style.css";
import logo from "./assets/logo.png";

const App = () => {
  const [activeTab, setActiveTab] = useState("Soft");
  const [quantités, setQuantités] = useState({});
  const [total, setTotal] = useState(0);

  const produits = {
    Soft: [
      { nom: "Pepsi", prix: 4 },
      { nom: "Pepsi Max", prix: 4 },
      { nom: "Ice Tea Pêche", prix: 4 },
      { nom: "7 Up Zéro", prix: 4 },
      { nom: "Liptonic", prix: 4 },
      { nom: "Red Bull", prix: 5 },
      { nom: "Red Bull Sans Sucre", prix: 5 },
      { nom: "Red Bull Abricot-Fraise", prix: 5 },
      { nom: "Red Bull Red Edition (pastèque)", prix: 5 },
      { nom: "Cristaline", prix: 3 },
      { nom: "San Pellegrino", prix: 3 }
    ],
    Bière: [
      { nom: "FADA Blonde (50cl)", prix: 8 },
      { nom: "FADA IPA (50cl)", prix: 8 },
      { nom: "FADA Abricot (50cl)", prix: 8 },
      { nom: "FADA Blanche (50cl)", prix: 8 },
      { nom: "FADA Blonde (150cl)", prix: 22 },
      { nom: "FADA IPA (150cl)", prix: 22 },
      { nom: "FADA Abricot (150cl)", prix: 22 },
      { nom: "FADA Blanche (150cl)", prix: 22 }
    ],
    Alcool: [
      { nom: "Vin Rosé (12cl)", prix: 4 },
      { nom: "Vin Blanc (12cl)", prix: 4 },
      { nom: "Champagne (12cl)", prix: 8 },
      { nom: "Spritz (25cl)", prix: 12 },
      { nom: "Spritz Rosé (25cl)", prix: 12 }
    ],
    Consigne: [
      { nom: "Verre consigné", prix: 1 },
      { nom: "Pichet consigné", prix: 3 }
    ]
  };

  const changerQuantité = (produit, delta) => {
    const nouvelleQuantité = Math.max((quantités[produit] || 0) + delta, 0);
    const nouvellesQuantités = { ...quantités, [produit]: nouvelleQuantité };
    setQuantités(nouvellesQuantités);

    const nouveauTotal = Object.entries(nouvellesQuantités).reduce((acc, [nom, qte]) => {
      const article = Object.values(produits).flat().find((p) => p.nom === nom);
      return acc + (article ? article.prix * qte : 0);
    }, 0);
    setTotal(nouveauTotal);
  };

  return (
    <div className="app">
      <img src={logo} alt="Logo" className="logo" />
      <h1>Encaissement - Bar 1</h1>
      <div className="tabs">
        {Object.keys(produits).map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? "active" : ""}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      {produits[activeTab].map(({ nom, prix }) => (
        <div key={nom} className="ligne-produit">
          <span>{nom} - {prix} €</span>
          <button onClick={() => changerQuantité(nom, -1)}>-</button>
          <input
            type="number"
            min="0"
            value={quantités[nom] || 0}
            onChange={(e) => changerQuantité(nom, parseInt(e.target.value) - (quantités[nom] || 0))}
          />
          <button onClick={() => changerQuantité(nom, 1)}>+</button>
        </div>
      ))}
      <h2>Total : {total} €</h2>
    </div>
  );
};

export default App;
