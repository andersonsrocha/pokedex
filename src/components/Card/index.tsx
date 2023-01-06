import React, { useEffect, useState, MouseEvent } from "react";
import {
  getBorderClassName,
  getGradientClassName,
  getFillColorClassName,
  getTextClassName,
  getTypeIcon,
} from "@utils";
import { WeightIcon } from "@icons";
import { HeightIcon } from "@radix-ui/react-icons";
import { Img, Spin, Stats } from "@components";
import { Pokemon, PokemonClient, PokemonSpecies } from "pokenode-ts";
import { useMountEffect } from "@hooks";

type Props = {
  loading?: boolean;
  pokemon: Pokemon;
  onClick?: (pokemon: Pokemon) => void;
};

export function Card(props: Props) {
  const api = new PokemonClient();

  const { pokemon: poke, onClick } = props;

  const [loading, setLoading] = useState(false);
  const [variety, setVariety] = useState(0);
  const [pokemon, setPokemon] = useState<Pokemon>(poke);
  const [specie, setSpecie] = useState<PokemonSpecies>();

  const getWeight = (weight: number) => {
    return `${weight / 10} kg`;
  };

  const getHeight = (height: number) => {
    return `${height / 10} m`;
  };

  const getSprite = (pokemon: Pokemon, form?: number) => {
    let sprite = pokemon.sprites.other?.["official-artwork"].front_default;
    if (!sprite && form) {
      const number = String(pokemon.id).padStart(3, "0");
      const endpoint = `${number}_f${form}`;
      sprite = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${endpoint}.png`;
    }

    return sprite || "";
  };

  const onVarietyChanged = async (e: MouseEvent, oldIndex: number) => {
    e.stopPropagation();

    if (specie) {
      setLoading(true);

      const { varieties } = specie;
      const newIndex = oldIndex == varieties.length - 1 ? 0 : oldIndex + 1;
      const { name } = varieties[newIndex].pokemon;
      const pokemon = await api.getPokemonByName(name);

      setVariety(newIndex);
      setPokemon(pokemon);
      setTimeout(() => setLoading(false), 500);
    }
  };

  useMountEffect(async () => {
    setLoading(true);

    const { species } = pokemon;
    const specie = await api.getPokemonSpeciesByName(species.name);

    setSpecie(specie);
    setTimeout(() => setLoading(false), 500);
  });

  const pokeNumber = String(pokemon.id).padStart(3, "0");

  return (
    <Spin.Spinner spinning={props.loading || loading}>
      <div onClick={() => onClick?.(pokemon)} className="min-h-[390px]">
        <div className="cursor-pointer shadow-lg transition-transform duration-300 md:hover:scale-105 dark:hover:shadow-white/10">
          {specie && (
            <div
              className={`card rounded-lg bg-gradient-to-br ${getGradientClassName(pokemon, 0)}`}
            >
              <div className="card-header p-4 text-center text-white">
                <div className="number font-extrabold relative">
                  <div className="number">#{pokeNumber}</div>

                  <div className="form-button" hidden={specie.varieties.length < 2}>
                    <button
                      title="Transform"
                      className="flex justify-center items-center bg-transparent border border-divide-light absolute top-0 right-0 w-6 h-6 rounded-full text-sm hover:bg-gray-100"
                      onClick={(e) => onVarietyChanged(e, variety)}
                    >
                      ✨
                    </button>
                  </div>
                </div>

                <div className="image flex justify-center min-h-[100px]">
                  <Img alt="poke" width={100} src={getSprite(pokemon)} />
                </div>

                <div className="name capitalize font-extrabold">{pokemon.name}</div>
              </div>

              <div className="card-content flex flex-col gap-4 bg-white text-text-light rounded-lg p-4">
                <div className="typing flex justify-center gap-6">
                  {pokemon.types.map(({ type }, index) => (
                    <div
                      key={index}
                      className={`border-2 ${getBorderClassName(type.name)} 
                    drop-shadow-[0_0_4px] ${getTextClassName(type.name)} 
                    px-2 py-px rounded-md`}
                    >
                      <div className="flex gap-1">
                        <div className="type-icon">
                          {React.createElement(getTypeIcon(type.name), {
                            className: `w-3 ${getFillColorClassName(type.name)}`,
                          })}
                        </div>
                        <div className="type-name capitalize">{type.name}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="format grid grid-cols-2 gap-2 text-xs">
                  <div className="flex justify-center items-center gap-1 border border-divide-light rounded-3xl bg-black/5 p-2">
                    <div className="format-icon">
                      <WeightIcon />
                    </div>
                    <div className="format-value">{getWeight(pokemon.weight)}</div>
                  </div>

                  <div className="flex justify-center items-center gap-1 border border-divide-light rounded-3xl bg-black/5 p-2">
                    <div className="format-icon">
                      <HeightIcon />
                    </div>
                    <div className="format-value">{getHeight(pokemon.height)}</div>
                  </div>
                </div>

                <div className="stats text-xs">
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
    </Spin.Spinner>
  );
}
