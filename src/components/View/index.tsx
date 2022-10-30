import React, { useEffect, useState } from "react";
import { FemaleOutline, MaleOutline, WaveOutline } from "@icons";
import { getType, getTypeIcon } from "@utils";
import classNames from "classnames";

import { Spin, Img, Evolution } from "..";

import { Chain, Pokemon, Specie } from "@types";

type Props = {
  pokemon?: Pokemon;
};

export function View({ pokemon: poke }: Props) {
  const [tab, setTab] = useState(0);
  const [genre, setGenre] = useState(1);
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [specie, setSpecie] = useState<Specie>();
  const [evolution, setEvolution] = useState<Chain>();
  const [gender, setGender] = useState(false);
  const [loading, setLoading] = useState(false);

  const getGradientClassName = (position: number) => {
    if (pokemon) {
      return classNames({
        "xl:to-brand-100 xl:from-bug-500": getType(pokemon, position) === "bug",
        "xl:to-brand-100 xl:from-dark-500": getType(pokemon, position) === "dark",
        "xl:to-brand-100 xl:from-dragon-500": getType(pokemon, position) === "dragon",
        "xl:to-brand-100 xl:from-electric-500": getType(pokemon, position) === "electric",
        "xl:to-brand-100 xl:from-fairy-500": getType(pokemon, position) === "fairy",
        "xl:to-brand-100 xl:from-fighting-500": getType(pokemon, position) === "fighting",
        "xl:to-brand-100 xl:from-fire-500": getType(pokemon, position) === "fire",
        "xl:to-brand-100 xl:from-flying-500": getType(pokemon, position) === "flying",
        "xl:to-brand-100 xl:from-ghost-500": getType(pokemon, position) === "ghost",
        "xl:to-brand-100 xl:from-grass-500": getType(pokemon, position) === "grass",
        "xl:to-brand-100 xl:from-ground-500": getType(pokemon, position) === "ground",
        "xl:to-brand-100 xl:from-ice-500": getType(pokemon, position) === "ice",
        "xl:to-brand-100 xl:from-normal-500": getType(pokemon, position) === "normal",
        "xl:to-brand-100 xl:from-poison-500": getType(pokemon, position) === "poison",
        "xl:to-brand-100 xl:from-psychic-500": getType(pokemon, position) === "psychic",
        "xl:to-brand-100 xl:from-rock-500": getType(pokemon, position) === "rock",
        "xl:to-brand-100 xl:from-steel-500": getType(pokemon, position) === "steel",
        "xl:to-brand-100 xl:from-water-500": getType(pokemon, position) === "water",
      });
    }

    return "";
  };

  const getColorClassName = (position: number) => {
    if (pokemon) {
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
    }

    return "";
  };

  const getPokemonDescription = (specie: Specie) => {
    const { flavor_text_entries } = specie;
    const flavor_texts = flavor_text_entries.filter((x) => x.language.name == "en");
    const flavor_text = flavor_texts.pop();
    if (flavor_text) return flavor_text.flavor_text;
    return "";
  };

  const getPokemonGenera = (specie: Specie) => {
    const { genera } = specie;
    const gen = genera.find((x) => x.language.name == "en");
    if (gen) return gen.genus;
    return "";
  };

  const getSprite = (pokemon: Pokemon, genre: number) => {
    let sprite = "";

    // se forma for feminina
    if (
      specie &&
      genre > 1 &&
      specie.has_gender_differences &&
      !specie.forms_switchable &&
      specie.varieties.length < 2
    ) {
      const number = String(pokemon.id).padStart(3, "0");
      const endpoint = `${number}_f${genre}`;
      sprite = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${endpoint}.png`;
    } else if (
      specie &&
      genre > 1 &&
      specie.has_gender_differences &&
      !specie.forms_switchable &&
      specie.varieties.length > 1
    ) {
      const url = specie.varieties[genre - 1].pokemon.url;
      const split = url.split("/");

      const oldNumber = String(pokemon.id);
      let newNumber = split[split.length - 1];

      if (url.endsWith("/")) newNumber = split[split.length - 2];

      const image = pokemon.sprites.other["official-artwork"].front_default;
      sprite = image.replace(oldNumber, newNumber);
    } else {
      // caso não, retorna a forma padrão
      sprite = pokemon.sprites.other["official-artwork"].front_default;
    }

    // se sprite for nula busca em outro banco de dados
    if (!sprite) {
      const number = String(pokemon.id).padStart(3, "0");
      sprite = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${number}.png`;
    }

    return sprite;
  };

  const onGenreChanged = async (genre: 1 | 2) => {
    if (specie && gender) {
      const { varieties } = specie;
      setLoading(true);

      const url = varieties[genre - 1].pokemon.url;
      const request = await fetch(url);
      const response = await request.json();

      setPokemon(response);
      setLoading(false);
    }

    setGenre(genre);
  };

  useEffect(() => {
    if (poke) {
      (async () => {
        setLoading(true);

        const { id } = poke;
        const request1 = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
        const specie = (await request1.json()) as Specie;

        if (specie.evolution_chain) {
          const request2 = await fetch(specie.evolution_chain.url);
          const { chain } = await request2.json();
          setEvolution(chain);
        } else {
          setEvolution(undefined);
        }

        const { varieties } = specie;
        const names = varieties.map((v) => v.pokemon.name);
        setGender(names.some((name) => name.includes("female")));

        setPokemon(poke);
        setSpecie(specie);
        setLoading(false);
      })();
    }
  }, [poke]);

  return (
    <div className={`sticky top-24 rounded-lg p-4 xl:bg-gradient-to-br ${getGradientClassName(0)}`}>
      {pokemon && specie && (
        <Spin spinning={loading}>
          <div className="flex flex-col gap-4">
            <div className="header relative z-30">
              <div className="absolute top-0 left-0">
                <div
                  className={classNames(
                    "absolute duration-500 w-10 h-full transition-all left-8 -z-10",
                    { "-top-12": tab === 0, "-top-4": tab === 1, "top-4": tab === 2 }
                  )}
                >
                  <WaveOutline />
                </div>

                <ul className="flex flex-col gap-2 w-8 px-1 py-5 bg-white/20 rounded-3xl min-h-[120px]">
                  <li onClick={() => setTab(0)} className="cursor-pointer">
                    <Img
                      className={classNames("duration-400 transition-all", {
                        "ml-2": tab === 0,
                      })}
                      src="https://img.icons8.com/fluency/48/000000/pokeball.png"
                    />
                  </li>
                  <li onClick={() => setTab(1)} className="cursor-pointer">
                    <Img
                      className={classNames("duration-400 transition-all", { "ml-2": tab === 1 })}
                      src="https://img.icons8.com/color/48/000000/superball.png"
                    />
                  </li>
                  <li onClick={() => setTab(2)} className="cursor-pointer">
                    <Img
                      className={classNames("duration-400 transition-all", { "ml-2": tab === 2 })}
                      src="https://img.icons8.com/color/48/000000/ultra-ball.png"
                    />
                  </li>
                </ul>
              </div>

              {(specie.has_gender_differences || gender) && (
                <div className="absolute top-0 right-0">
                  <div
                    className={classNames(
                      "absolute duration-500 w-10 h-full transition-all right-8 rotate-180 -z-10",
                      { "top-0": genre === 1, "top-8": genre === 2 }
                    )}
                  >
                    <WaveOutline />
                  </div>

                  <ul className="flex flex-col gap-2 w-8 px-1 py-5 bg-white/20 rounded-3xl">
                    <li onClick={() => onGenreChanged(1)} className="cursor-pointer">
                      <div
                        className={classNames("w-6 duration-400 transition-all", {
                          "-ml-1": genre === 1,
                        })}
                      >
                        <div className="w-6 border border-blue-800 bg-blue-400 rounded-full p-0.5">
                          <MaleOutline />
                        </div>
                      </div>
                    </li>
                    <li onClick={() => onGenreChanged(2)} className="cursor-pointer">
                      <div
                        className={classNames("w-6 duration-400 transition-all", {
                          "-ml-1": genre === 2,
                        })}
                      >
                        <div className="border border-pink-800 bg-pink-400 rounded-full p-0.5">
                          <FemaleOutline />
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            <div className="main relative text-white text-center z-20">
              <div className="flex justify-center items-end h-[80px] relative">
                <Img alt="poke" width={150} src={getSprite(pokemon, genre)} />
              </div>

              <div className="text-white/70">{`#${pokemon.id.toString().padStart(3, "0")}`}</div>

              <div className="flex flex-col gap-2">
                <div className="capitalize text-xl">{pokemon.name}</div>
                <div className="text-white/70 text-sm">{getPokemonGenera(specie)}</div>
                <div className="flex justify-center gap-2">
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
                <div className="flex flex-col gap-2">
                  <div className="text-white">POKÉDEX ENTRY</div>
                  <div className="text-white/70 text-sm">{getPokemonDescription(specie)}</div>
                </div>
              </div>

              <div className="mt-3">
                {tab === 0 && (
                  <div className="flex flex-col gap-2">
                    <div className="text-white">ABILITIES</div>
                    <div className="text-white/70 text-sm capitalize w-full flex justify-center flex-wrap gap-2">
                      {pokemon.abilities.map((x, i) => (
                        <div
                          key={i}
                          className="w-[45%] border border-gray-500 p-2 rounded-3xl bg-white/10"
                        >
                          {x.ability.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {tab === 1 && (
                  <div className="grid grid-cols-2 gap-2">
                    <div className="flex flex-col gap-2">
                      <div className="text-white">HEIGHT</div>
                      <div className="text-white/70 text-sm capitalize border border-gray-500 flex-1 p-2 rounded-3xl bg-white/10">
                        {pokemon.height / 10}m
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="text-white">WEIGHT</div>
                      <div className="text-white/70 text-sm capitalize border border-gray-500 flex-1 p-2 rounded-3xl bg-white/10">
                        {pokemon.weight / 10}kg
                      </div>
                    </div>
                  </div>
                )}

                {tab === 2 && evolution && <Evolution chain={evolution} />}
              </div>
            </div>
          </div>
        </Spin>
      )}
    </div>
  );
}
