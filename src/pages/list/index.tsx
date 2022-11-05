import { createRef, FormEvent, Fragment, useEffect, useState } from "react";
import {
  Card,
  Drawer,
  Empty,
  Input,
  PageChangeEvent,
  Pagination,
  PaginationProps,
  Select,
  Spin,
  View,
} from "@components";
import {
  BugIcon,
  DarkIcon,
  DragonIcon,
  ElectricIcon,
  FairyIcon,
  FightingIcon,
  FireIcon,
  FlyingIcon,
  GhostIcon,
  GrassIcon,
  GroundIcon,
  IceIcon,
  NormalIcon,
  PoisonIcon,
  PsychicIcon,
  RockIcon,
  SteelIcon,
  WaterIcon,
} from "@icons";
import { MagnifyingGlassIcon, OpacityIcon } from "@radix-ui/react-icons";

import { NamedPokemon, Pokemon, Typing } from "@types";

type Filters = {
  search: string;
  type?: Typing;
};

export function List() {
  const input = createRef<HTMLInputElement>();

  const [lastIndex, setLastIndex] = useState(0);
  const [filter, setFilter] = useState<Filters>({ search: "" });
  const [expand, setExpand] = useState(false);
  const [open, setOpen] = useState(false);
  const [initialize, setInitialize] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [pokemons, setPokemons] = useState<Array<Pokemon>>([]);
  const [pagination, setPagination] = useState<PaginationProps>({ count: 0, pageNumber: 1 });

  const find = (list: Array<NamedPokemon>, pageNumber: number, pageSize: number) => {
    const { search } = filter;
    const value = search.toLowerCase();

    list = list.filter((x) => {
      const url = x.url.split("pokemon/")[1];
      const id = url.replace(/\D/g, "");
      return Number(id) <= lastIndex;
    });

    let pokemons: Array<NamedPokemon> = list;

    if (search) pokemons = pokemons.filter((x) => x.name.toLowerCase().includes(value));

    const sliced = pokemons.slice(
      (pageNumber - 1) * pageSize,
      (pageNumber - 1) * pageSize + pageSize
    );

    return {
      count: list.length,
      results: sliced,
    };
  };

  const onCardClick = (pokemon: Pokemon) => {
    setOpen(true);
    setExpand(true);
    setPokemon(pokemon);
  };

  const onPageChanged = ({ pageNumber, pageSize }: PageChangeEvent) => {
    setPagination((pag) => ({ ...pag, pageNumber, pageSize }));
  };

  const onFilterChanged = (key: keyof Filters, value: unknown, e?: FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    setPagination((pag) => ({ ...pag, pageNumber: 1 }));
    setFilter((filter) => ({ ...filter, [key]: value }));
  };

  const onDrawerClose = () => {
    setOpen(false);
  };

  const onConcluded = (concluded: boolean) => {
    setLoading(!concluded);
  };

  const compoundURL = () => {
    const { search, type } = filter;
    const { pageNumber, pageSize = 21 } = pagination;

    if (type) {
      return `https://pokeapi.co/api/v2/type/${type}`;
    } else if (type || search) {
      return "https://pokeapi.co/api/v2/pokemon-species?limit=10000";
    }

    return `https://pokeapi.co/api/v2/pokemon-species?limit=${pageSize}&offset=${
      (pageNumber - 1) * pageSize
    }`;
  };

  useEffect(() => {
    (async () => {
      setLoading(true);

      const { pageNumber, pageSize = 21 } = pagination;
      const { type } = filter;

      const url = compoundURL();
      const request = await fetch(url);
      let response = await request.json();

      if (type) {
        const results = response.pokemon.map((pokemon: any) => pokemon.pokemon);
        response = find(results, pageNumber, pageSize);
      } else {
        response = find(response.results, pageNumber, pageSize);
      }

      let list: Array<Pokemon> = [];
      for (const item of response.results) {
        const request = await fetch(item.url.replace("-species", ""));
        const pokemon = (await request.json()) as Pokemon;
        list.push(pokemon);
      }

      if (!initialize) {
        const request = await fetch("https://pokeapi.co/api/v2/pokemon-species");
        const { count } = await request.json();
        setLastIndex(count);
      }

      setPokemon(list[0]);
      setPokemons(list);
      setPagination((pag) => ({ ...pag, count: response.count }));
      setInitialize(true);
    })();
  }, [pagination.pageNumber, filter]);

  return (
    <Fragment>
      <div className="flex flex-col gap-8">
        <div className="shadow-md rounded-md bg-component-light p-4 mb-4 dark:bg-component-dark-600">
          <div className="relative w-full">
            <form
              autoComplete="off"
              onSubmit={(e) => onFilterChanged("search", input.current?.value, e)}
            >
              <div className="flex gap-4">
                <Input
                  ref={input}
                  defaultValue={filter.search}
                  type="search"
                  name="search"
                  placeholder="Pesquisar"
                  addonBefore={<MagnifyingGlassIcon />}
                />

                <Select
                  placeholder="Tipo"
                  value={filter.type}
                  icon={<OpacityIcon />}
                  onChange={(value) => onFilterChanged("type", value)}
                >
                  <Select.Option
                    value="bug"
                    icon={<BugIcon className="w-3 text-bug-500 drop-shadow-[0_0_4px]" />}
                  >
                    Bug
                  </Select.Option>
                  <Select.Option
                    value="dark"
                    icon={<DarkIcon className="w-3 text-dark-500 drop-shadow-[0_0_4px]" />}
                  >
                    Dark
                  </Select.Option>
                  <Select.Option
                    value="dragon"
                    icon={<DragonIcon className="w-3 text-dragon-500 drop-shadow-[0_0_4px]" />}
                  >
                    Dragon
                  </Select.Option>
                  <Select.Option
                    value="electric"
                    icon={<ElectricIcon className="w-3 text-electric-500 drop-shadow-[0_0_4px]" />}
                  >
                    Electric
                  </Select.Option>
                  <Select.Option
                    value="fairy"
                    icon={<FairyIcon className="w-3 text-fairy-500 drop-shadow-[0_0_4px]" />}
                  >
                    Fairy
                  </Select.Option>
                  <Select.Option
                    value="fighting"
                    icon={<FightingIcon className="w-3 text-fighting-500 drop-shadow-[0_0_4px]" />}
                  >
                    Fighting
                  </Select.Option>
                  <Select.Option
                    value="fire"
                    icon={<FireIcon className="w-3 text-fire-500 drop-shadow-[0_0_4px]" />}
                  >
                    Fire
                  </Select.Option>
                  <Select.Option
                    value="flying"
                    icon={<FlyingIcon className="w-3 text-flying-500 drop-shadow-[0_0_4px]" />}
                  >
                    Flying
                  </Select.Option>
                  <Select.Option
                    value="ghost"
                    icon={<GhostIcon className="w-3 text-ghost-500 drop-shadow-[0_0_4px]" />}
                  >
                    Ghost
                  </Select.Option>
                  <Select.Option
                    value="grass"
                    icon={<GrassIcon className="w-3 text-grass-500 drop-shadow-[0_0_4px]" />}
                  >
                    Grass
                  </Select.Option>
                  <Select.Option
                    value="ground"
                    icon={<GroundIcon className="w-3 text-ground-500 drop-shadow-[0_0_4px]" />}
                  >
                    Ground
                  </Select.Option>
                  <Select.Option
                    value="ice"
                    icon={<IceIcon className="w-3 text-ice-500 drop-shadow-[0_0_4px]" />}
                  >
                    Ice
                  </Select.Option>
                  <Select.Option
                    value="normal"
                    icon={<NormalIcon className="w-3 text-normal-500 drop-shadow-[0_0_4px]" />}
                  >
                    Normal
                  </Select.Option>
                  <Select.Option
                    value="poison"
                    icon={<PoisonIcon className="w-3 text-poison-500 drop-shadow-[0_0_4px]" />}
                  >
                    Poison
                  </Select.Option>
                  <Select.Option
                    value="psychic"
                    icon={<PsychicIcon className="w-3 text-psychic-500 drop-shadow-[0_0_4px]" />}
                  >
                    Psychic
                  </Select.Option>
                  <Select.Option
                    value="rock"
                    icon={<RockIcon className="w-3 text-rock-500 drop-shadow-[0_0_4px]" />}
                  >
                    Rock
                  </Select.Option>
                  <Select.Option
                    value="steel"
                    icon={<SteelIcon className="w-3 text-steel-500 drop-shadow-[0_0_4px]" />}
                  >
                    Steel
                  </Select.Option>
                  <Select.Option
                    value="water"
                    icon={<WaterIcon className="w-3 text-water-500 drop-shadow-[0_0_4px]" />}
                  >
                    Water
                  </Select.Option>
                </Select>
              </div>
            </form>
          </div>
        </div>

        {!initialize && <Spin.Loading spinning={loading} />}

        {initialize && !!pokemons.length && (
          <Fragment>
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 xl:col-span-9">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pokemons.map((pokemon) => (
                    <Card
                      key={pokemon.name}
                      loading={loading}
                      pokemon={pokemon}
                      onConcluded={onConcluded}
                      onClick={() => onCardClick(pokemon)}
                    />
                  ))}
                </div>
              </div>

              <div className="col-span-3 hidden xl:block">
                <View loading={loading} onConcluded={onConcluded} pokemon={pokemon} />
              </div>
            </div>

            <div className="flex justify-center">
              <Pagination {...pagination} onChange={onPageChanged} />
            </div>
          </Fragment>
        )}

        {initialize && !pokemons.length && <Empty />}
      </div>

      <Drawer expanded={expand} open={open} onChange={setExpand} onClose={onDrawerClose}>
        <View loading={loading} onConcluded={onConcluded} pokemon={pokemon} />
      </Drawer>
    </Fragment>
  );
}
