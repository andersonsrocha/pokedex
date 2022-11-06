import { Fragment, useEffect, useState } from "react";
import { ArrowRightIcon } from "@radix-ui/react-icons";

import { Spin, Img } from "..";

import { Chain, Pokemon } from "@types";

type Props = {
  chain: Chain;
  onClick?: (pokemon: Pokemon) => void;
};

export function Evolution({ chain, onClick }: Props) {
  const [loading, setLoading] = useState(false);
  const [evolution, setEvolution] = useState<Array<Array<Pokemon>>>([]);

  useEffect(() => {
    (async () => {
      setLoading(true);

      const species: Array<Array<string>> = [];
      const getSpecies = (arr: Array<Array<string>> = [], chain: Chain) => {
        arr.push([chain.species.url.replace("-species", "")]);
        if (chain.evolves_to.length == 1) {
          chain.evolves_to.forEach((c) => getSpecies(arr, c));
        } else if (chain.evolves_to.length > 1) {
          arr.push(chain.evolves_to.map((c) => c.species.url.replace("-species", "")));
        }
      };

      // obtain species
      getSpecies(species, chain);
      const pokemons: Array<Array<Pokemon>> = [];
      for (const urls of species) {
        const pokes: Array<Pokemon> = [];
        for (const url of urls) {
          const request = await fetch(url);
          const response = await request.json();
          pokes.push(response);
        }

        pokemons.push(pokes);
      }

      setEvolution(pokemons);
      setLoading(false);
    })();
  }, [chain]);

  return (
    <Spin.Spinner spinning={loading}>
      <div className="flex justify-between items-center">
        {evolution.map((pokes, index) => (
          <Fragment key={index}>
            <div className="flex">
              {pokes.map((poke, index) => (
                <div key={index} className="w-full">
                  <Img
                    width={60}
                    onClick={() => onClick?.(poke)}
                    className="hover:scale-110 cursor-pointer"
                    src={poke.sprites.other["official-artwork"].front_default}
                    alt="icon"
                  />
                </div>
              ))}
            </div>

            {index != evolution.length - 1 && <ArrowRightIcon />}
          </Fragment>
        ))}
      </div>
    </Spin.Spinner>
  );
}
