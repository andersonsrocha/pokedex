import { Fragment, useEffect, useState, MouseEvent } from "react";
import { CloseOutline } from "@icons";
import { getType } from "@utils";
import classNames from "classnames";

import { Evolution, Spin } from "..";

import { Chain, Pokemon, Specie } from "@types";

type Props = {
  open?: boolean;
  pokemon?: Pokemon;
  onClose?: () => void;
  onClick?: (pokemon: Pokemon) => void;
};

export function Modal({ open, pokemon, onClose, onClick }: Props) {
  const [specie, setSpecie] = useState<Specie>();
  const [evolution, setEvolution] = useState<Chain>();
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("about");

  const closeOnEscapeKeyDown = (e: KeyboardEvent) => {
    if (onClose && (e.code || e.key) === "Escape") {
      // document.body.classList.remove("overflow-hidden");
      onClose();
    }
  };

  const closeOnClick = () => {
    if (onClose) {
      document.body.classList.remove("overflow-hidden");
      onClose();
    }
  };

  const getGradientClassName = (position: number) => {
    if (pokemon) {
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
    }

    return "";
  };

  const getPokemonName = (specie: Specie) => {
    if (pokemon) {
      const { names } = specie;
      const language = names.find((x) => x.language.name == "ja");
      if (language) return language.name;

      return pokemon.name;
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

  useEffect(() => {
    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    // if (open) document.body.classList.add("overflow-hidden");

    return function cleanup() {
      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (pokemon) {
      (async () => {
        setLoading(true);

        const { id } = pokemon;
        const request1 = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
        const specie = await request1.json();

        if (specie.evolution_chain) {
          const request2 = await fetch(specie.evolution_chain.url);
          const { chain } = await request2.json();

          setEvolution(chain);
        }

        setSpecie(specie);
        setLoading(false);
      })();
    }
  }, [pokemon]);

  return (
    <div
      className={classNames("modal transition-all duration-500 pointer-events-none", {
        "opacity-0": !open,
        "opacity-100": open,
      })}
    >
      <div className="overlay fixed inset-0 w-full h-full z-30 bg-black/30" />

      <div
        onClick={closeOnClick}
        className={classNames(
          "modal-content z-40 fixed inset-0 flex justify-center items-center w-full h-full",
          { "pointer-events-none": !open, "pointer-events-auto": open }
        )}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="modal-body bg-brand-500 rounded-lg text-white shadow-lg shadow-black relative z-50 w-[90vw] md:w-[800px] md:h-[300px]"
        >
          <Spin spinning={loading}>
            <div className="flex justify-end w-full">
              <button
                onClick={closeOnClick}
                className="absolute m-2 flex justify-center items-center w-8 h-8 bg-brand-100 rounded-full text-white hover:bg-white/10"
              >
                <CloseOutline />
              </button>
            </div>

            {pokemon && specie && (
              <div className="grid grid-cols-1 grid-rows-2 md:grid-cols-[300px_auto] md:grid-rows-1 h-full">
                <div className={`p-4 rounded-l-lg bg-gradient-to-br ${getGradientClassName(0)}`}>
                  <div className="flex items-center">
                    <div className="font-bold text-3xl opacity-75">{getPokemonName(specie)}</div>
                    <img
                      alt="image"
                      className="w-[250px] md:w-[300px] ml-3"
                      src={pokemon?.sprites.other["official-artwork"].front_default}
                    />
                  </div>
                </div>

                <div className="p-4">
                  <div className="text-sm font-medium text-center text-white border-b border-divide">
                    <ul className="flex flex-wrap -mb-px">
                      <li className="teste mr-2">
                        <button
                          onClick={() => setTab("about")}
                          className={classNames(
                            "inline-block p-4 rounded-t-lg border-transparent hover:text-white/50 hover:border-white/50",
                            { "border-b-2 border-b-white": tab == "about" }
                          )}
                        >
                          About
                        </button>
                      </li>

                      <li className="teste mr-2">
                        <button
                          onClick={() => setTab("info")}
                          className={classNames(
                            "inline-block p-4 rounded-t-lg border-transparent hover:text-white/50 hover:border-white/50",
                            { "border-b-2 border-b-white": tab == "info" }
                          )}
                        >
                          Info
                        </button>
                      </li>

                      <li className="mr-2">
                        <button
                          onClick={() => setTab("evolution")}
                          className={classNames(
                            "inline-block p-4 rounded-t-lg border-transparent hover:text-white/50 hover:border-white/50",
                            { "border-b-2 border-b-white": tab == "evolution" }
                          )}
                        >
                          Evolution
                        </button>
                      </li>
                    </ul>
                  </div>

                  <div className="px-3 flex flex-col gap-4 mt-4 text-sm font-thin h-[200px] overflow-x-hidden overflow-y-auto md:overflow-visible">
                    {tab == "about" && <div>{getPokemonDescription(specie)}</div>}

                    {tab == "info" && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
                        <div className="grid grid-cols-12 gap-1">
                          <div className="font-bold col-span-6 md:col-span-4">Specie</div>
                          <div className="col-span-6 md:col-span-8">{getPokemonGenera(specie)}</div>

                          <div className="font-bold col-span-6 md:col-span-4">Height</div>
                          <div className="col-span-6 md:col-span-8">{pokemon.height / 10}m</div>

                          <div className="font-bold col-span-6 md:col-span-4">Weight</div>
                          <div className="col-span-6 md:col-span-8">{pokemon.weight / 10}kg</div>

                          <div className="font-bold col-span-6 md:col-span-4">Abilities</div>
                          <div className="col-span-6 md:col-span-8 capitalize">
                            {pokemon.abilities.map((x) => x.ability.name).join(", ")}
                          </div>
                        </div>

                        <div className="grid grid-cols-12 gap-1">
                          <div className="font-bold col-span-6">Base Exp</div>
                          <div className="col-span-6">{pokemon.base_experience}</div>

                          <div className="font-bold col-span-6">Base Happiness</div>
                          <div className="col-span-6">{specie.base_happiness}</div>

                          <div className="font-bold col-span-6">Catch Rate</div>
                          <div className="col-span-6">{`${(
                            (specie.capture_rate / 255) *
                            100
                          ).toFixed(1)}%`}</div>

                          <div className="font-bold col-span-6">Growth Rate</div>
                          <div className="col-span-6 capitalize">{specie.growth_rate.name}</div>
                        </div>
                      </div>
                    )}

                    {tab == "evolution" && evolution && (
                      <Evolution chain={evolution} onClick={onClick} />
                    )}
                  </div>
                </div>
              </div>
            )}
          </Spin>
        </div>
      </div>
    </div>
  );
}
