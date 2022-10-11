import React, { useContext, useEffect, useState } from "react";
import { getType, getTypeIcon } from "@utils";
import { Spin, Stats } from "@components";
import { WeightOutline, HeightOutline } from "@icons";
import classNames from "classnames";

import { LayoutContext } from "../../layout";

import { Pokemon } from "@types";

type Props = {
  pokemon: Pokemon;
  onClick?: () => void;
};

export function Card(props: Props) {
  const { onClick } = props;

  const [loading, setLoading] = useState(false);
  const [pokemon, setPokemon] = useState(props.pokemon);
  const [variety, setVariety] = useState(-1);

  const { v } = useContext(LayoutContext);

  const pokeNumber = String(pokemon.id).padStart(3, "0");
  const typeLen = pokemon.types.length;

  const getGradientClassName = (position: number) => {
    return classNames({
      "to-brand-100 from-bug-500": getType(pokemon, position) === "bug",
      "to-brand-100 from-dark-500": getType(pokemon, position) === "dark",
      "to-brand-100 from-dragon-500": getType(pokemon, position) === "dragon",
      "to-brand-100 from-electric-500": getType(pokemon, position) === "electric",
      "to-brand-100 from-fairy-500": getType(pokemon, position) === "fairy",
      "to-brand-100 from-fighting-500": getType(pokemon, position) === "fighting",
      "to-brand-100 from-fire-500": getType(pokemon, position) === "fire",
      "to-brand-100 from-flying-500": getType(pokemon, position) === "flying",
      "to-brand-100 from-ghost-500": getType(pokemon, position) === "ghost",
      "to-brand-100 from-grass-500": getType(pokemon, position) === "grass",
      "to-brand-100 from-ground-500": getType(pokemon, position) === "ground",
      "to-brand-100 from-ice-500": getType(pokemon, position) === "ice",
      "to-brand-100 from-normal-500": getType(pokemon, position) === "normal",
      "to-brand-100 from-poison-500": getType(pokemon, position) === "poison",
      "to-brand-100 from-psychic-500": getType(pokemon, position) === "psychic",
      "to-brand-100 from-rock-500": getType(pokemon, position) === "rock",
      "to-brand-100 from-steel-500": getType(pokemon, position) === "steel",
      "to-brand-100 from-water-500": getType(pokemon, position) === "water",
    });
  };

  const getColorClassName = (position: number) => {
    return classNames({
      "text-bug-500": getType(pokemon, position) === "bug",
      "text-dark-500": getType(pokemon, position) === "dark",
      "text-dragon-500": getType(pokemon, position) === "dragon",
      "text-electric-500": getType(pokemon, position) === "electric",
      "text-fairy-500": getType(pokemon, position) === "fairy",
      "text-fighting-500": getType(pokemon, position) === "fighting",
      "text-fire-500": getType(pokemon, position) === "fire",
      "text-flying-500": getType(pokemon, position) === "flying",
      "text-ghost-500": getType(pokemon, position) === "ghost",
      "text-grass-500": getType(pokemon, position) === "grass",
      "text-ground-500": getType(pokemon, position) === "ground",
      "text-ice-500": getType(pokemon, position) === "ice",
      "text-normal-500": getType(pokemon, position) === "normal",
      "text-poison-500": getType(pokemon, position) === "poison",
      "text-psychic-500": getType(pokemon, position) === "psychic",
      "text-rock-500": getType(pokemon, position) === "rock",
      "text-steel-500": getType(pokemon, position) === "steel",
      "text-water-500": getType(pokemon, position) === "water",
    });
  };

  const getWeight = (weight: number) => {
    return `${weight / 10} kg`;
  };

  const getHeight = (height: number) => {
    return `${height / 10} m`;
  };

  const onVarietyChanged = () => {
    setVariety((old) => {
      const { varieties } = pokemon;
      if (old + 1 == varieties.length) {
        return 0;
      } else if (old < 0) {
        return 1;
      } else {
        return old + 1;
      }
    });
  };

  useEffect(() => {
    (async () => {
      if (variety > -1) {
        setLoading(true);

        const { varieties } = pokemon;
        const request = await fetch(varieties[variety].pokemon.url);
        const response = await request.json();

        setPokemon(({ varieties }) => ({ ...response, varieties }));
        setLoading(false);
      }
    })();
  }, [variety]);

  return (
    <div
      onClick={onClick}
      className="shadow-lg cursor-pointer md:hover:scale-105 transition duration-300 ease-in-out"
    >
      <div className="container h-[390px]">
        <Spin spinning={loading}>
          <div
            className={`bg-gradient-radial flex flex-col h-full rounded-lg ${getGradientClassName(
              0
            )}`}
          >
            <div className="text-white p-2 flex flex-col items-center">
              {pokemon.varieties.length > 1 && (
                <button
                  title="Form"
                  onClick={onVarietyChanged}
                  className="flex justify-center items-center bg-brand-100 absolute translate-x-[600%] md:translate-x-[500%] w-6 h-6 rounded-full text-sm hover:bg-brand-500"
                >
                  ✨
                </button>
              )}
              <div className="font-extrabold">{`#${pokeNumber}`}</div>
              <div className="h-[100px]">
                <img
                  alt="poke"
                  width={100}
                  src={pokemon.sprites.other[v == 1 ? "official-artwork" : "home"].front_default}
                />
              </div>
              <div className="capitalize">{pokemon.name}</div>
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
                  <WeightOutline />
                  {getWeight(pokemon.weight)}
                </div>
                <div className="flex justify-center items-center gap-1">
                  <HeightOutline />
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
        </Spin>
      </div>
    </div>
  );
}
