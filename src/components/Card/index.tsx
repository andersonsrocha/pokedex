import React from "react";
import classNames from "classnames";
import { getType, getTypeIcon } from "@utils";
import { Stats } from "@components";
import * as Icons from "@icons";

import { Pokemon } from "@types";

type Props = {
  pokemon: Pokemon;
};

export function Card(props: Props) {
  const { pokemon } = props;

  const pokeNumber = String(pokemon.id).padStart(3, "0");
  const typeLen = pokemon.types.length;

  const getGradientClassName = (position: number) => {
    return classNames({
      "to-brand-100 from-grass-500": getType(pokemon, position) === "grass",
      "to-brand-100 from-fire-500": getType(pokemon, position) === "fire",
      "to-brand-100 from-water-500": getType(pokemon, position) === "water",
      "to-brand-100 from-poison-500": getType(pokemon, position) === "poison",
      "to-brand-100 from-bug-500": getType(pokemon, position) === "bug",
      "to-brand-100 from-flying-500": getType(pokemon, position) === "flying",
      "to-brand-100 from-normal-500": getType(pokemon, position) === "normal",
      "to-brand-100 from-electric-500": getType(pokemon, position) === "electric",
    });
  };

  const getColorClassName = (position: number) => {
    return classNames({
      "text-grass-500": getType(pokemon, position) === "grass",
      "text-fire-500": getType(pokemon, position) === "fire",
      "text-water-500": getType(pokemon, position) === "water",
      "text-poison-500": getType(pokemon, position) === "poison",
      "text-bug-500": getType(pokemon, position) === "bug",
      "text-flying-500": getType(pokemon, position) === "flying",
      "text-normal-500": getType(pokemon, position) === "normal",
      "text-electric-500": getType(pokemon, position) === "electric",
    });
  };

  const getWeight = (weight: number) => {
    return `${weight / 10} kg`;
  };

  const getHeight = (height: number) => {
    return `${height / 10} m`;
  };

  return (
    <div className="shadow-lg cursor-pointer hover:scale-105 transition duration-300 ease-in-out">
      <div className="container h-96">
        <div
          className={`bg-gradient-radial flex flex-col h-full rounded-lg ${getGradientClassName(
            0
          )}`}
        >
          <div className="text-white p-2 flex flex-col items-center">
            <div className="poke-number font-extrabold">{`#${pokeNumber}`}</div>
            <div className="poke-icon h-full">
              <img
                src={pokemon.sprites.other["official-artwork"].front_default}
                alt="poke"
                width={100}
              />
            </div>
            <div className="poke-name capitalize">{pokemon.name}</div>
          </div>

          <div className="bg-white text-sm shadow-2xl flex flex-col gap-4 flex-1 rounded-t-2xl rounded-b-lg p-4">
            {/* types */}
            <div className={`grid grid-cols-${typeLen}`}>
              {pokemon.types.map(({ type }, index) => (
                <div key={index} className="flex justify-center">
                  <div
                    className={`rounded-md py-1/2 px-2 capitalize border-2 drop-shadow-[0_0_4px] flex justify-center items-center gap-1 ${getColorClassName(
                      index
                    )}`}
                  >
                    {React.createElement(getTypeIcon(type.name), { className: "w-3" })}
                    {type.name}
                  </div>
                </div>
              ))}
            </div>

            {/* info */}
            <div className="grid grid-cols-2 divide-x">
              <div className="flex justify-center items-center gap-1">
                <Icons.WeightOutline />
                {getWeight(pokemon.weight)}
              </div>
              <div className="flex justify-center items-center gap-1">
                <Icons.HeightOutline />
                {getHeight(pokemon.height)}
              </div>
            </div>

            {/* stats */}
            <div>
              <div className="grid grid-cols-12 items-center">
                <div className="col-span-3">HP</div>
                <div className="col-span-2">{pokemon.stats[0].base_stat}</div>
                <div className="col-span-7">
                  <Stats value={pokemon.stats[0].base_stat} />
                </div>
              </div>
              <div className="grid grid-cols-12 items-center">
                <div className="col-span-3">Attack</div>
                <div className="col-span-2">{pokemon.stats[1].base_stat}</div>
                <div className="col-span-7">
                  <Stats value={pokemon.stats[1].base_stat} />
                </div>
              </div>
              <div className="grid grid-cols-12 items-center">
                <div className="col-span-3">Defense</div>
                <div className="col-span-2">{pokemon.stats[2].base_stat}</div>
                <div className="col-span-7">
                  <Stats value={pokemon.stats[2].base_stat} />
                </div>
              </div>
              <div className="grid grid-cols-12 items-center">
                <div className="col-span-3">Sp. Atk</div>
                <div className="col-span-2">{pokemon.stats[3].base_stat}</div>
                <div className="col-span-7">
                  <Stats value={pokemon.stats[3].base_stat} />
                </div>
              </div>
              <div className="grid grid-cols-12 items-center">
                <div className="col-span-3">Sp. Def</div>
                <div className="col-span-2">{pokemon.stats[4].base_stat}</div>
                <div className="col-span-7">
                  <Stats value={pokemon.stats[4].base_stat} />
                </div>
              </div>
              <div className="grid grid-cols-12 items-center">
                <div className="col-span-3">Speed</div>
                <div className="col-span-2">{pokemon.stats[5].base_stat}</div>
                <div className="col-span-7">
                  <Stats value={pokemon.stats[5].base_stat} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
