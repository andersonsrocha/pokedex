import { useEffect, useState } from "react";
import { Card } from "@components";

import { Header } from "./layout";

import { Pokemon } from "@types";

export function App() {
  const [loading, setLoading] = useState(false);
  const [pokemons, setPokemons] = useState<Array<Pokemon>>([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const request = await fetch("https://pokeapi.co/api/v2/pokemon");
      const response = await request.json();

      const list = [];
      for (const item of response.results) {
        const request = await fetch(item.url);
        const response = await request.json();
        list.push(response);
      }

      setPokemons(list);
      setLoading(false);
    })();
  }, []);

  return (
    <section>
      <Header />

      <main className="bg-brand-100 min-h-screen h-auto px-20 py-10 font-brand">
        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6">
          {pokemons.map((pokemon) => (
            <Card key={pokemon.name} pokemon={pokemon} />
          ))}
        </div>
      </main>
    </section>
  );
}
