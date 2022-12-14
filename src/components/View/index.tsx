import React, { useState, MouseEvent, useEffect, Fragment } from "react";
import { BookIcon, DislikeIcon, EvolutionIcon, FemaleIcon, MaleIcon, PokeballIcon } from "@icons";
import {
  getBgClassName,
  getBorderClassName,
  getStrokeColorClassName,
  getTextClassName,
  getType,
  getTypeIcon,
  getWeakness,
} from "@utils";
import { EyeNoneIcon } from "@radix-ui/react-icons";
import { PokemonClient, Pokemon, PokemonSpecies, ChainLink } from "pokenode-ts";
import classNames from "classnames";

import { Spin, Img, Evolution, Stats } from "..";

import { Typing } from "@types";

type Props = {
  loading?: boolean;
  pokemon?: Pokemon;
  lastIndex: number;
  onChange?: (pokemon: Pokemon) => void;
};

type Weakness = {
  "0": Array<[string, number]>;
  "1/4": Array<[string, number]>;
  "1/2": Array<[string, number]>;
  "1": Array<[string, number]>;
  "2": Array<[string, number]>;
  "4": Array<[string, number]>;
};

export function View(props: Props) {
  const api = new PokemonClient();

  const { pokemon: poke, onChange, lastIndex } = props;

  const [tab, setTab] = useState(0);
  const [genre, setGenre] = useState(-1);
  const [variety, setVariety] = useState(0);
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [prev, setPrev] = useState<Pokemon>();
  const [next, setNext] = useState<Pokemon>();
  const [specie, setSpecie] = useState<PokemonSpecies>();
  const [evolution, setEvolution] = useState<ChainLink>();
  const [weakness, setWeakness] = useState<Weakness>();
  const [loading, setLoading] = useState(false);

  const getGradientClassName = (position: number) => {
    if (pokemon) {
      return classNames({
        "xl:to-secondary-500 xl:from-bug-500": getType(pokemon, position) === "bug",
        "xl:to-secondary-500 xl:from-dark-500": getType(pokemon, position) === "dark",
        "xl:to-secondary-500 xl:from-dragon-500": getType(pokemon, position) === "dragon",
        "xl:to-secondary-500 xl:from-electric-500": getType(pokemon, position) === "electric",
        "xl:to-secondary-500 xl:from-fairy-500": getType(pokemon, position) === "fairy",
        "xl:to-secondary-500 xl:from-fighting-500": getType(pokemon, position) === "fighting",
        "xl:to-secondary-500 xl:from-fire-500": getType(pokemon, position) === "fire",
        "xl:to-secondary-500 xl:from-flying-500": getType(pokemon, position) === "flying",
        "xl:to-secondary-500 xl:from-ghost-500": getType(pokemon, position) === "ghost",
        "xl:to-secondary-500 xl:from-grass-500": getType(pokemon, position) === "grass",
        "xl:to-secondary-500 xl:from-ground-500": getType(pokemon, position) === "ground",
        "xl:to-secondary-500 xl:from-ice-500": getType(pokemon, position) === "ice",
        "xl:to-secondary-500 xl:from-normal-500": getType(pokemon, position) === "normal",
        "xl:to-secondary-500 xl:from-poison-500": getType(pokemon, position) === "poison",
        "xl:to-secondary-500 xl:from-psychic-500": getType(pokemon, position) === "psychic",
        "xl:to-secondary-500 xl:from-rock-500": getType(pokemon, position) === "rock",
        "xl:to-secondary-500 xl:from-steel-500": getType(pokemon, position) === "steel",
        "xl:to-secondary-500 xl:from-water-500": getType(pokemon, position) === "water",
      });
    }

    return "";
  };

  const getPokemonDescription = (specie: PokemonSpecies) => {
    const { flavor_text_entries } = specie;
    const flavor_texts = flavor_text_entries.filter((x) => x.language.name == "en");
    const flavor_text = flavor_texts.pop();
    if (flavor_text) return flavor_text.flavor_text;
    return "";
  };

  const getPokemonGenera = (specie: PokemonSpecies) => {
    const { genera } = specie;
    const gen = genera.find((x) => x.language.name == "en");
    if (gen) return gen.genus;
    return "";
  };

  const onVarietyChanged = async (e: MouseEvent, oldIndex: number) => {
    e.stopPropagation();

    if (specie) {
      setLoading(true);

      const { varieties } = specie;
      const newIndex = oldIndex == varieties.length - 1 ? 0 : oldIndex + 1;
      const { name } = varieties[newIndex].pokemon;
      const pokemon = await api.getPokemonByName(name);

      if (pokemon.name.includes("female")) {
        setGenre(100);
      } else if (pokemon.name.includes("male")) {
        setGenre(0);
      }

      setVariety(newIndex);
      setPokemon(pokemon);
      setTimeout(() => setLoading(false), 500);
    }
  };

  useEffect(() => {
    if (!poke) return;

    (async () => {
      setLoading(true);

      const { species } = poke;
      const specie = await api.getPokemonSpeciesByName(species.name);

      if (specie.evolution_chain) {
        const request = await fetch(specie.evolution_chain.url);
        const { chain } = await request.json();
        setEvolution(chain);
      } else {
        setEvolution(undefined);
      }

      if (specie.gender_rate !== -1) {
        const rate = (specie.gender_rate / 8) * 100;
        setGenre(rate);
      } else {
        setGenre(-1);
      }

      if (poke.id >= 1 && poke.id <= lastIndex) {
        if (poke.id !== 1) {
          const prev = await api.getPokemonById(poke.id - 1);
          setPrev(prev);
        } else {
          setNext(undefined);
        }

        if (poke.id !== lastIndex) {
          const next = await api.getPokemonById(poke.id + 1);
          setNext(next);
        } else {
          setNext(undefined);
        }
      } else {
        setNext(undefined);
        setPrev(undefined);
      }

      const types = poke.types.map(({ type }) => type.name);
      const weakness = getWeakness(...types);
      const entries = Object.entries(weakness);
      const defense: Weakness = {
        "0": entries.filter((x) => x[1] === 0),
        "1/4": entries.filter((x) => x[1] === 0.25),
        "1/2": entries.filter((x) => x[1] === 0.5),
        "1": entries.filter((x) => x[1] === 1),
        "2": entries.filter((x) => x[1] === 2),
        "4": entries.filter((x) => x[1] === 4),
      };

      setPokemon(poke);
      setSpecie(specie);
      setWeakness(defense);
      setLoading(false);
    })();
  }, [poke]);

  const pokeNumber = String(pokemon?.id).padStart(3, "0");

  return (
    <div className={`sticky top-24 rounded-lg p-4 xl:bg-gradient-to-br ${getGradientClassName(0)}`}>
      <Spin.Spinner spinning={props.loading || loading}>
        {pokemon && specie && (
          <Fragment>
            <div className="extra relative z-30">
              <div className="absolute top-0 left-0">
                <ul className="bg-black/5 rounded-md py-2 flex flex-col items-center gap-4 text-secondary-500 xl:text-white/70">
                  <li
                    onClick={() => setTab(0)}
                    className={classNames(
                      "cursor-pointer w-8 h-6 flex justify-center items-center",
                      { "border-l-2 border-black/25": tab === 0 }
                    )}
                  >
                    <PokeballIcon
                      className={classNames("[stroke-dasharray:400] w-5 h-5", {
                        "animate-strok": tab === 0,
                      })}
                    />
                  </li>
                  <li
                    onClick={() => setTab(1)}
                    className={classNames(
                      "cursor-pointer w-8 h-6 flex justify-center items-center",
                      { "border-l-2 border-black/25": tab === 1 }
                    )}
                  >
                    <BookIcon
                      className={classNames("[stroke-dasharray:400] w-5 h-5", {
                        "animate-strok": tab === 1,
                      })}
                    />
                  </li>
                  <li
                    onClick={() => setTab(2)}
                    className={classNames(
                      "cursor-pointer w-8 h-6 flex justify-center items-center",
                      { "border-l-2 border-black/25": tab === 2 }
                    )}
                  >
                    <DislikeIcon
                      className={classNames("[stroke-dasharray:400] w-5 h-5", {
                        "animate-strok": tab === 2,
                      })}
                    />
                  </li>
                  <li
                    onClick={() => setTab(3)}
                    className={classNames(
                      "cursor-pointer w-8 h-6 flex justify-center items-center",
                      { "border-l-2 border-black/25": tab === 3 }
                    )}
                  >
                    <EvolutionIcon
                      className={classNames("[stroke-dasharray:400] stroke w-5 h-5", {
                        "animate-strok": tab === 3,
                      })}
                    />
                  </li>
                </ul>
              </div>

              {specie.varieties.length > 1 && (
                <button
                  title="Transform"
                  className="flex justify-center items-center bg-transparent border border-divide-light absolute right-0 w-6 h-6 rounded-full text-sm hover:bg-gray-100"
                  onClick={(e) => onVarietyChanged(e, variety)}
                >
                  ???
                </button>
              )}
            </div>

            <div className="card-header text-text-light dark:text-text-dark xl:text-text-dark z-20">
              <div className="image flex justify-center items-end h-24">
                <Img
                  alt="poke"
                  width={150}
                  src={pokemon.sprites.other?.["official-artwork"].front_default || ""}
                />
              </div>

              <div className="text-center text-text-light/70 xl:text-text-dark/70 dark:text-text-dark/70">
                #{pokeNumber}
              </div>

              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <div className="info text-center">
                    <div className="capitalize text-xl font-bold">{pokemon.name}</div>
                    <div className="text-text-light/70 xl:text-text-dark/70 dark:text-text-dark/70 text-xs">
                      {getPokemonGenera(specie)}
                    </div>
                  </div>

                  <div className="genre text-xs">
                    <div className="flex items-center justify-center gap-4">
                      <div className="flex gap-1">
                        <MaleIcon className="w-4" /> {genre === -1 ? 0 : 100 - genre}%
                      </div>
                      <div className="flex gap-1">
                        {genre === -1 ? 0 : genre}% <FemaleIcon className="w-4" />
                      </div>
                    </div>
                  </div>

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
                              className: `w-3 ${getStrokeColorClassName(type.name)}`,
                            })}
                          </div>
                          <div className="type-name capitalize xl:text-white">{type.name}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-center">
                  <div
                    className={classNames("gap-2", { "flex flex-col": tab == 0, hidden: tab != 0 })}
                  >
                    <div className="text-text-light xl:text-text-dark dark:text-text-dark">
                      POK??DEX ENTRY
                    </div>

                    <div className="text-text-light/70 xl:text-text-dark dark:text-text-dark/70 text-xs">
                      {getPokemonDescription(specie)}
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

                  <div
                    className={classNames("gap-2", { "flex flex-col": tab == 1, hidden: tab != 1 })}
                  >
                    <div className="text-text-light dark:text-text-dark xl:text-text-dark">
                      ABILITIES
                    </div>

                    <div className="text-text-light/70 xl:text-text-dark dark:text-text-dark/70 capitalize w-full flex justify-center flex-wrap gap-2">
                      {pokemon.abilities.map((x, i) => (
                        <div
                          key={i}
                          title={x.is_hidden ? "Hidden Ability" : ""}
                          className="flex justify-center gap-1 cursor-pointer w-[45%] border border-divide-light p-2 text-xs rounded-3xl bg-white/10"
                        >
                          {x.ability.name} {x.is_hidden && <EyeNoneIcon />}
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-center">
                      <div className="w-[45%] text-text-light dark:text-text-dark xl:text-text-dark">
                        HEIGHT
                      </div>

                      <div className="w-[45%] text-text-light dark:text-text-dark xl:text-text-dark">
                        WEIGHT
                      </div>
                    </div>

                    <div className="flex justify-center gap-2">
                      <div className="w-[45%] cursor-pointer text-text-light/70 xl:text-text-dark dark:text-text-dark/70 text-xs capitalize border border-divide-light p-2 rounded-3xl bg-white/10">
                        {pokemon.height / 10}m
                      </div>

                      <div className="w-[45%] cursor-pointer text-text-light/70 xl:text-text-dark dark:text-text-dark/70 text-xs capitalize border border-divide-light p-2 rounded-3xl bg-white/10">
                        {pokemon.weight / 10}kg
                      </div>
                    </div>
                  </div>

                  <div
                    className={classNames("gap-2", { "flex flex-col": tab == 2, hidden: tab != 2 })}
                  >
                    <div className="text-text-light dark:text-text-dark xl:text-text-dark">
                      WEAKNESS
                    </div>

                    <div className="cursor-pointer text-text-dark dark:text-text-dark/70 text-xs capitalize border border-divide-light flex-1 p-2 rounded-md bg-white/10">
                      {weakness && (
                        <table className="w-full border-separate border-spacing-0.5">
                          <tbody>
                            <tr hidden={!weakness["0"].length}>
                              <td>
                                <div className="w-5 h-5 bg-secondary-500 rounded-full flex justify-center items-center">
                                  0??
                                </div>
                              </td>
                              <td className="flex flex-wrap gap-0.5">
                                {weakness["0"].map(([key]) => (
                                  <div
                                    key={key}
                                    className={`w-5 h-5 rounded-full flex justify-center items-center ${getBgClassName(
                                      key
                                    )}`}
                                  >
                                    {React.createElement(getTypeIcon(key), { className: "w-3" })}
                                  </div>
                                ))}
                              </td>
                            </tr>

                            <tr hidden={!weakness["1/4"].length}>
                              <td>
                                <div className="w-5 h-5 bg-secondary-500 rounded-full flex justify-center items-center">
                                  ????
                                </div>
                              </td>
                              <td className="flex flex-wrap gap-0.5">
                                {weakness["1/4"].map(([key]) => (
                                  <div
                                    key={key}
                                    className={`w-5 h-5 rounded-full flex justify-center items-center ${getBgClassName(
                                      key
                                    )}`}
                                  >
                                    {React.createElement(getTypeIcon(key as Typing), {
                                      className: "w-3",
                                    })}
                                  </div>
                                ))}
                              </td>
                            </tr>

                            <tr hidden={!weakness["1/2"].length}>
                              <td>
                                <div className="w-5 h-5 bg-secondary-500 rounded-full flex justify-center items-center">
                                  ????
                                </div>
                              </td>
                              <td className="flex flex-wrap gap-0.5">
                                {weakness["1/2"].map(([key]) => (
                                  <div
                                    key={key}
                                    className={`w-5 h-5 rounded-full flex justify-center items-center ${getBgClassName(
                                      key
                                    )}`}
                                  >
                                    {React.createElement(getTypeIcon(key as Typing), {
                                      className: "w-3",
                                    })}
                                  </div>
                                ))}
                              </td>
                            </tr>

                            <tr hidden={!weakness["1"].length}>
                              <td>
                                <div className="w-5 h-5 bg-secondary-500 rounded-full flex justify-center items-center">
                                  1??
                                </div>
                              </td>
                              <td className="flex flex-wrap gap-0.5">
                                {weakness["1"].map(([key]) => (
                                  <div
                                    key={key}
                                    className={`w-5 h-5 rounded-full flex justify-center items-center ${getBgClassName(
                                      key
                                    )}`}
                                  >
                                    {React.createElement(getTypeIcon(key as Typing), {
                                      className: "w-3",
                                    })}
                                  </div>
                                ))}
                              </td>
                            </tr>

                            <tr hidden={!weakness["2"].length}>
                              <td>
                                <div className="w-5 h-5 bg-secondary-500 rounded-full flex justify-center items-center">
                                  2??
                                </div>
                              </td>
                              <td className="flex flex-wrap gap-0.5">
                                {weakness["2"].map(([key]) => (
                                  <div
                                    key={key}
                                    className={`w-5 h-5 rounded-full flex justify-center items-center ${getBgClassName(
                                      key
                                    )}`}
                                  >
                                    {React.createElement(getTypeIcon(key as Typing), {
                                      className: "w-3",
                                    })}
                                  </div>
                                ))}
                              </td>
                            </tr>

                            <tr hidden={!weakness["4"].length}>
                              <td>
                                <div className="w-5 h-5 bg-secondary-500 rounded-full flex justify-center items-center">
                                  4??
                                </div>
                              </td>
                              <td className="flex flex-wrap gap-0.5">
                                {weakness["4"].map(([key]) => (
                                  <div
                                    key={key}
                                    className={`w-5 h-5 rounded-full flex justify-center items-center ${getBgClassName(
                                      key
                                    )}`}
                                  >
                                    {React.createElement(getTypeIcon(key as Typing), {
                                      className: "w-3",
                                    })}
                                  </div>
                                ))}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      )}
                    </div>
                  </div>

                  <div hidden={!(tab == 3 && !!evolution)}>
                    <Evolution chain={evolution} onClick={onChange} />
                  </div>
                </div>

                <div className="bg-white/5 grid grid-cols-2 p-1 min-h-[46px] rounded-md divide-x divide-white/10">
                  <button
                    disabled={!prev}
                    onClick={() => onChange?.(prev!)}
                    className="flex items-center gap-1 rounded-l-md p-1 capitalize enabled:hover:bg-white/10 disabled:cursor-not-allowed"
                  >
                    <div hidden={!prev}>
                      <img
                        alt="prev"
                        src={prev?.sprites.versions["generation-vii"].icons.front_default || ""}
                      />
                    </div>
                    <span className="overflow-hidden whitespace-nowrap text-ellipsis">
                      {prev?.name}
                    </span>
                  </button>

                  <button
                    disabled={!next}
                    onClick={() => onChange?.(next!)}
                    className="flex justify-end items-center gap-1 rounded-r-md p-1 capitalize enabled:hover:bg-white/10 disabled:cursor-not-allowed"
                  >
                    <span className="overflow-hidden whitespace-nowrap text-ellipsis">
                      {next?.name}
                    </span>
                    <div hidden={!next}>
                      <img
                        alt="next"
                        src={next?.sprites.versions["generation-vii"].icons.front_default || ""}
                      />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </Fragment>
        )}
      </Spin.Spinner>
    </div>
  );
}
