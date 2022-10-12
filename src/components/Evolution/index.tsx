import { ArrowRightOutline } from "@icons";
import { Chain, Pokemon } from "@types";
import classNames from "classnames";
import { Fragment, useEffect, useState } from "react";
import { Spin } from "../Spin";

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
  }, []);

  return (
    <Spin spinning={loading}>
      <div className="flex justify-center gap-3 items-center">
        {evolution.map((pokes, index) => (
          <Fragment key={index}>
            <div className="min-w-[100px] grid grid-cols-12 gap-2">
              {pokes.map((poke, index) => (
                <div
                  key={index}
                  onClick={() => onClick?.(poke)}
                  className={classNames("w-ful hover:scale-105 hover:z-50", {
                    "scale-[0.65]": pokes.length > 1,
                    "col-span-12": pokes.length == 1,
                    "col-span-6": pokes.length == 2,
                    "col-span-4": pokes.length == 3,
                    "col-span-3 scale-[0.65] h-[90px]": pokes.length > 3,
                  })}
                >
                  <div className="bg-brand-100 flex justify-center mt-[88px] text-center rounded-md relative w-full px-1 pt-2 pb-1 cursor-pointer border-2 border-white shadow-md shadow-black">
                    <div className="capitalize">{poke.name}</div>
                    <div className="bg-brand-100 absolute flex justify-center items-center w-24 h-24 rounded-full -top-[90px] border-2 border-white">
                      <img
                        width={80}
                        src={poke.sprites.other["official-artwork"].front_default}
                        alt="icon"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {index != evolution.length - 1 && (
              <div className="text-[300%]">
                <ArrowRightOutline />
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </Spin>
  );
}
