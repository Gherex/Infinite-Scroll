import { useEffect, useState, useRef } from "react";
import "./ListaFacts.css";

export default function ListaFacts() {
  const [facts, setFacts] = useState([]);
  const lastListElement = useRef(null);
  const URL_CAT_FACT = "https://catfact.ninja/fact";

  const fetchFacts = async () => {
    const arrayFacts = [];
    for (let i = 0; i < 5; i++) {
      const response = await fetch(URL_CAT_FACT);
      const data = await response.json();
      arrayFacts.push(data.fact);
    }
    
    setFacts((prevFacts) => [...prevFacts, ...arrayFacts]);
  };

  useEffect(() => {
    fetchFacts(); // Carga inicial de facts
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        fetchFacts();
      }
    }, {
      root: null, //Viewport como contenedor
      rootMargin: "0px",
      threshold: 1.0
    });

    const currentElement = lastListElement.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    // Limpiar el observer cuando el componente se desmonte o el último elemento cambie
    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [facts]);

  return (
    <section className="list-h2-container">
      <h2>Lista infinita de random facts:</h2>
      <ul className="list-container">
        {facts.map((fact, index) => (
          <li 
            key={index}
            ref={index === facts.length - 1 ? lastListElement : null} // Referencia solo en el último elemento 
            className="list-element" 
          >
            {fact}
          </li>
        ))}
      </ul>
    </section>
  );  
}
