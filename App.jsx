import React, { useState } from "react";
import logo from "./assets/logo.png";
import "./style.css";

const produits = [
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
  { nom: "San Pellegrino", prix: 3 },
];

export default function App() {
  const [quantites, setQuantites] = useState(Array(produits.length).fill(0));
  const [mode, setMode] = useState("CB");
  const [especes, setEspeces] = useState("");
  const [cb, setCB] = useState("");

  const total = quantites.reduce((acc, qte, i) => acc + qte * produits[i].prix, 0);

  const handleChange = (index, delta) => {
    const copy = [...quantites];
    copy[index] = Math.max(0, copy[index] + delta);
    setQuantites(copy);
  };

  return (
    <div className="app">
      <img src={logo} alt="logo" className="logo" />
      <h1>Encaissement - Bar 1</h1>
      <div className="produits">
        {produits.map((p, i) => (
          <div key={i} className="produit">
            {p.nom} - {p.prix} €
            <div className="quantite">
              <button onClick={() => handleChange(i, -1)}>-</button>
              <input type="number" value={quantites[i]} readOnly />
              <button onClick={() => handleChange(i, 1)}>+</button>
            </div>
          </div>
        ))}
      </div>
      <h2>Total : {total} €</h2>

      <div className="paiement">
        <h3>Mode de règlement :</h3>
        <label><input type="radio" name="mode" value="CB" checked={mode === "CB"} onChange={() => setMode("CB")} /> Carte</label>
        <label><input type="radio" name="mode" value="Espèces" checked={mode === "Espèces"} onChange={() => setMode("Espèces")} /> Espèces</label>
        <label><input type="radio" name="mode" value="Mixte" checked={mode === "Mixte"} onChange={() => setMode("Mixte")} /> Mixte</label>

        {mode === "Mixte" && (
          <div className="mixte-inputs">
            <input type="number" placeholder="Montant en espèces (€)" value={especes} onChange={e => setEspeces(e.target.value)} />
            <input type="number" placeholder="Montant en carte (€)" value={cb} onChange={e => setCB(e.target.value)} />
          </div>
        )}
      </div>
    </div>
  );
}