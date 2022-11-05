import React, { useEffect, useState, MouseEvent } from "react";
import { getType, getTypeIcon } from "@utils";
import { Img, Spin, Stats } from "@components";
import classNames from "classnames";

import { Pokemon, Specie } from "@types";
import { HeightIcon } from "@radix-ui/react-icons";
import { WeightIcon } from "@icons";

type Props = {
  loading?: boolean;
  pokemon: Pokemon;
  onClick?: () => void;
};

export function Card(props: Props) {
  const { pokemon: poke, onClick } = props;

  const [loading, setLoading] = useState(false);
  const [variety, setVariety] = useState(0);
  const [pokemon, setPokemon] = useState<Pokemon>(poke);
  const [specie, setSpecie] = useState<Specie>();

  const pokeNumber = String(pokemon.id).padStart(3, "0");
  const typeLen = pokemon.types.length;

  const getGradientClassName = (position: number) => {
    return classNames({
      "to-secondary-500 from-bug-500": getType(pokemon, position) === "bug",
      "to-secondary-500 from-dark-500": getType(pokemon, position) === "dark",
      "to-secondary-500 from-dragon-500": getType(pokemon, position) === "dragon",
      "to-secondary-500 from-electric-500": getType(pokemon, position) === "electric",
      "to-secondary-500 from-fairy-500": getType(pokemon, position) === "fairy",
      "to-secondary-500 from-fighting-500": getType(pokemon, position) === "fighting",
      "to-secondary-500 from-fire-500": getType(pokemon, position) === "fire",
      "to-secondary-500 from-flying-500": getType(pokemon, position) === "flying",
      "to-secondary-500 from-ghost-500": getType(pokemon, position) === "ghost",
      "to-secondary-500 from-grass-500": getType(pokemon, position) === "grass",
      "to-secondary-500 from-ground-500": getType(pokemon, position) === "ground",
      "to-secondary-500 from-ice-500": getType(pokemon, position) === "ice",
      "to-secondary-500 from-normal-500": getType(pokemon, position) === "normal",
      "to-secondary-500 from-poison-500": getType(pokemon, position) === "poison",
      "to-secondary-500 from-psychic-500": getType(pokemon, position) === "psychic",
      "to-secondary-500 from-rock-500": getType(pokemon, position) === "rock",
      "to-secondary-500 from-steel-500": getType(pokemon, position) === "steel",
      "to-secondary-500 from-water-500": getType(pokemon, position) === "water",
    });
  };

  const getColorClassName = (position: number) => {
    return classNames({
      "text-bug-500 border-bug-500": getType(pokemon, position) === "bug",
      "text-dark-500 border-dark-500": getType(pokemon, position) === "dark",
      "text-dragon-500 border-dragon-500": getType(pokemon, position) === "dragon",
      "text-electric-500 border-electric-500": getType(pokemon, position) === "electric",
      "text-fairy-500 border-fairy-500": getType(pokemon, position) === "fairy",
      "text-fighting-500 border-fighting-500": getType(pokemon, position) === "fighting",
      "text-fire-500 border-fire-500": getType(pokemon, position) === "fire",
      "text-flying-500 border-flying-500": getType(pokemon, position) === "flying",
      "text-ghost-500 border-ghost-500": getType(pokemon, position) === "ghost",
      "text-grass-500 border-grass-500": getType(pokemon, position) === "grass",
      "text-ground-500 border-ground-500": getType(pokemon, position) === "ground",
      "text-ice-500 border-ice-500": getType(pokemon, position) === "ice",
      "text-normal-500 border-normal-500": getType(pokemon, position) === "normal",
      "text-poison-500 border-poison-500": getType(pokemon, position) === "poison",
      "text-psychic-500 border-psychic-500": getType(pokemon, position) === "psychic",
      "text-rock-500 border-rock-500": getType(pokemon, position) === "rock",
      "text-steel-500 border-steel-500": getType(pokemon, position) === "steel",
      "text-water-500 border-water-500": getType(pokemon, position) === "water",
    });
  };

  const getWeight = (weight: number) => {
    return `${weight / 10} kg`;
  };

  const getHeight = (height: number) => {
    return `${height / 10} m`;
  };

  const getSprite = (pokemon: Pokemon, form?: number) => {
    let sprite = pokemon.sprites.other["official-artwork"].front_default;
    if (!sprite && form) {
      const number = String(pokemon.id).padStart(3, "0");
      const endpoint = `${number}_f${form}`;
      sprite = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${endpoint}.png`;
    }

    return sprite;
  };

  const onVarietyChanged = async (e: MouseEvent, oldIndex: number) => {
    e.stopPropagation();

    if (specie) {
      setLoading(true);

      const { varieties } = specie;
      const newIndex = oldIndex == varieties.length - 1 ? 0 : oldIndex + 1;
      const url = varieties[newIndex].pokemon.url;
      const request = await fetch(url);
      const response = await request.json();

      setVariety(newIndex);
      setPokemon(response);
      setTimeout(() => setLoading(false), 500);
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);

      const { id } = pokemon;
      const request = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
      const response = await request.json();

      setSpecie(response);
      setTimeout(() => setLoading(false), 500);
    })();
  }, []);

  return (
    <Spin.Skeleton spinning={props.loading || loading}>
      <div className="h-[390px]">
        <div
          onClick={onClick}
          className="hover:shadow-lg cursor-pointer md:hover:scale-105 transition duration-300 ease-in-out dark:hover:shadow-white/10"
        >
          {specie && (
            <div
              className={`flex flex-col h-full rounded-lg bg-gradient-to-br ${getGradientClassName(
                0
              )}`}
            >
              <div className="p-2 flex flex-col items-center text-text-dark">
                {specie.varieties.length > 1 && (
                  <div className="relative w-full">
                    <button
                      title="Transform"
                      className="flex justify-center items-center bg-transparent border border-divide-light absolute right-0 w-6 h-6 rounded-full text-sm hover:bg-gray-100"
                      onClick={(e) => onVarietyChanged(e, variety)}
                    >
                      ✨
                    </button>
                  </div>
                )}

                <div className="font-extrabold">{`#${pokeNumber}`}</div>

                <div className="h-[100px]">
                  <Img alt="poke" width={100} src={getSprite(pokemon)} />
                </div>

                <div className="capitalize">{pokemon.name}</div>
              </div>

              <div className="bg-component-light text-sm flex flex-col gap-4 flex-1 rounded-t-2xl rounded-b-lg p-4 text-text-light">
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

                <div className="grid grid-cols-2 divide-x">
                  <div className="flex justify-center items-center gap-1">
                    <WeightIcon />
                    {getWeight(pokemon.weight)}
                  </div>
                  <div className="flex justify-center items-center gap-1">
                    <HeightIcon />
                    {getHeight(pokemon.height)}
                  </div>
                </div>

                <div>
                  <div className="grid grid-cols-12 items-center">
                    <div className="col-span-3 font-bold">HP</div>
                    <div className="col-span-2">{pokemon.stats[0].base_stat}</div>
                    <div className="col-span-7">
                      <Stats value={pokemon.stats[0].base_stat} />
                    </div>
                  </div>
                  <div className="grid grid-cols-12 items-center">
                    <div className="col-span-3 font-bold">Attack</div>
                    <div className="col-span-2">{pokemon.stats[1].base_stat}</div>
                    <div className="col-span-7">
                      <Stats value={pokemon.stats[1].base_stat} />
                    </div>
                  </div>
                  <div className="grid grid-cols-12 items-center">
                    <div className="col-span-3 font-bold">Defense</div>
                    <div className="col-span-2">{pokemon.stats[2].base_stat}</div>
                    <div className="col-span-7">
                      <Stats value={pokemon.stats[2].base_stat} />
                    </div>
                  </div>
                  <div className="grid grid-cols-12 items-center">
                    <div className="col-span-3 font-bold">Sp. Atk</div>
                    <div className="col-span-2">{pokemon.stats[3].base_stat}</div>
                    <div className="col-span-7">
                      <Stats value={pokemon.stats[3].base_stat} />
                    </div>
                  </div>
                  <div className="grid grid-cols-12 items-center">
                    <div className="col-span-3 font-bold">Sp. Def</div>
                    <div className="col-span-2">{pokemon.stats[4].base_stat}</div>
                    <div className="col-span-7">
                      <Stats value={pokemon.stats[4].base_stat} />
                    </div>
                  </div>
                  <div className="grid grid-cols-12 items-center">
                    <div className="col-span-3 font-bold">Speed</div>
                    <div className="col-span-2">{pokemon.stats[5].base_stat}</div>
                    <div className="col-span-7">
                      <Stats value={pokemon.stats[5].base_stat} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Spin.Skeleton>
  );
}
