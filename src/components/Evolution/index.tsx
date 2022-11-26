import { Fragment, useEffect, useState } from "react";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { ChainLink, EvolutionDetail, Pokemon } from "pokenode-ts";

import { Spin, Img } from "..";

type Props = {
  chain: ChainLink;
  onClick?: (pokemon: Pokemon) => void;
};

type Evolution = {
  pokemons: Array<Pokemon>;
  details?: EvolutionDetail;
};

type Details = {
  urls: Array<string>;
  details?: EvolutionDetail;
};

export function Evolution({ chain, onClick }: Props) {
  const [loading, setLoading] = useState(false);
  const [evolution, setEvolution] = useState<Array<Evolution>>([]);

  useEffect(() => {
    (async () => {
      setLoading(true);

      const species: Array<Details> = [];
      const getSpecies = (arr: Array<Details> = [], chain: ChainLink) => {
        const url = chain.species.url.replace("-species", "");
        arr.push({ urls: [url], details: chain.evolution_details[0] });
        if (chain.evolves_to.length == 1) {
          chain.evolves_to.forEach((c) => getSpecies(arr, c));
        } else if (chain.evolves_to.length > 1) {
          const predicate = (c: ChainLink) => c.species.url.replace("-species", "");
          arr.push({
            urls: chain.evolves_to.map(predicate),
            details: chain.evolves_to[0].evolution_details[0],
          });
        }
      };

      // obtain species
      getSpecies(species, chain);
      const pokemons: Array<Evolution> = [];
      for (const { urls, details } of species) {
        const pokes: Array<Pokemon> = [];
        for (const url of urls) {
          const request = await fetch(url);
          const response = await request.json();
          pokes.push(response);
        }

        pokemons.push({ pokemons: pokes, details });
      }

      setEvolution(pokemons);
      setLoading(false);
    })();
  }, [chain]);

  return (
    <Spin.Spinner spinning={loading}>
      <div className="flex items-center justify-center min-h-[60px]">
        {evolution.map(({ pokemons }, key) => (
          <Fragment key={key}>
            {key !== 0 && (
              <div className="flex items-center">
                <ArrowRightIcon />
              </div>
            )}

            {pokemons.map((pokemon, index) => (
              <div key={index} className="w-full flex justify-center">
                <Img
                  width={60}
                  onClick={() => onClick?.(pokemon)}
                  className="hover:scale-110 cursor-pointer"
                  src={pokemon.sprites.other?.["official-artwork"].front_default || ""}
                  alt="icon"
                />
              </div>
            ))}
          </Fragment>
        ))}
      </div>
    </Spin.Spinner>
  );
}
