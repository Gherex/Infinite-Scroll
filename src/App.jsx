import "./App.css";
import PrimerFact from "./PrimerFact";
import ListaFacts from "./ListaFacts";

export function App() {
  return (
    <main className="app-container">
      <h1>App de gatitos</h1>
      <PrimerFact />
      <ListaFacts />
    </main>
  );
}
