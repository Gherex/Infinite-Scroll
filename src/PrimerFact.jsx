import { useEffect, useState } from "react";
import "./PrimerFact.css";

export default function PrimerFact() {
  const [fact, setFact] = useState("Primer fact");
  const [trigger, setTrigger] = useState(0); // Estado para forzar el re-renderizado
  const [imageUrl, setImageUrl] = useState();
  const URL_CAT_FACT = "https://catfact.ninja/fact";

  useEffect(() => {
    fetch(URL_CAT_FACT)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `Error con el fetching de datos, status: ${response.status}`
          );
        }
        return response.json();
      })
      .then((data) => {
        const { fact } = data;
        setFact(fact);
      })
      .catch((error) => {
        console.error("Hubo un problema con el fetch", error);
      });
  }, [trigger]); // useEffect se ejecutará cuando 'trigger' cambie

  useEffect(() => {
    if (!fact) return;
    const primeraPalabra = fact.split(" ")[0];
    const URL_CAT_IMG = `https://cataas.com/cat/says/${primeraPalabra}?fontSize=50&fontColor=white`;
    fetch(URL_CAT_IMG)
      .then((res) => res.url)
      .then((url) => setImageUrl(url));
  }, [fact]);

  function cambiarFact() {
    setTrigger((prev) => prev + 1); // Actualiza el estado para forzar el re-renderizado
  }

  return (
    <section className="tarjeta-container">
      <div className="fact-container">
        {fact && <p className="fact-container">{fact}</p>}
        {imageUrl && (
          <img
            className="imagen"
            src={imageUrl}
            alt="Imagen random de un gatito con la primera palabra de un fact"
          />
        )}
      </div>
      <button id="btn-cambiar" onClick={cambiarFact}>
        Cambiar
      </button>
    </section>
  );
}
