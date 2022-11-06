import { FormEvent, Fragment, useCallback, useEffect, useRef, useState } from "react";
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

export function List() {
  const input = useRef<HTMLInputElement>(null);

  const [lastIndex, setLastIndex] = useState(0);
  const [type, setType] = useState<Typing>();
  const [expand, setExpand] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [pokemons, setPokemons] = useState<Array<Pokemon>>([]);
  const [pagination, setPagination] = useState<PaginationProps>({ count: 0, pageNumber: 1 });

  /**
   * Função responsável por exibir detalhes de um pokemon ao clicar em um card.
   * Quando acionada abre o drawer (caso seja mobile) e exibe ao lado o pokemon selecionado (caso seja desktop).
   *
   * @param {Pokemon} pokemon pokemon acionado pelo clique.
   */
  const onCardClick = useCallback((pokemon: Pokemon) => {
    setOpen(true);
    setExpand(true);
    setPokemon(pokemon);
  }, []);

  /**
   * Função responsável por alterar a página da listagem.
   * Quando acionada altera o número e tamanho da página.
   *
   * @param {PageChangeEvent} param0 objeto da paginação.
   */
  const onPageChanged = useCallback(({ pageNumber, pageSize }: PageChangeEvent) => {
    setPagination((pag) => ({ ...pag, pageNumber, pageSize }));
  }, []);

  /**
   * Função responsável por realizar o filtro dos pokemons pelo tipo.
   * Quando acionado, se o valor do campo de busca {@link input.current.value} estiver definido,
   * após a requisição, realiza um filtro por nome. Caso o campo de busca não tenha sido definido,
   * vai retornar os pokemons apenas pelo tipo.
   *
   * @param {Typing} value valor definido no tipo do pokemon.
   */
  const onTypeChanged = useCallback(
    async (value: Typing) => {
      setLoading(true);

      const request = await fetch(`https://pokeapi.co/api/v2/type/${value}`);
      const response = await request.json();

      const results = (response.pokemon as Array<any>).map<NamedPokemon>(
        (pokemon: any) => pokemon.pokemon
      );

      const find = input.current?.value?.toLowerCase();
      const filtered = results.filter((x) => {
        const url = x.url.split("/pokemon")[1];
        const id = url.replace(/\D/g, "");
        return Number(id) <= lastIndex && (!find || x.name.includes(find));
      });

      const list: Array<Pokemon> = [];
      for (const item of filtered) {
        const request = await fetch(item.url);
        const pokemon = (await request.json()) as Pokemon;
        list.push(pokemon);
      }

      setPokemon(list[0]);
      setPokemons(list);
      setPagination((pag) => ({ ...pag, pageNumber: 1, count: filtered.length }));
      setType(value);
      setLoading(false);
    },
    [lastIndex]
  );

  /**
   * Função responsável por filtrar a lista quando o formulário é submetido.
   * Quando acionado, se o tipo estiver definido chama a função para buscar os tipos e filtra
   * {@link onTypeChanged}. Caso o tipo não tenha sido definido e o valor do campo de busca tenha
   * sido definido {@link input.current.value} realiza a busca e filtro dos pokemons pelo nome.
   * Caso nenhuma das condições tenha sido atendida, reseta a paginação.
   *
   * @param {FormEvent<HTMLFormElement>} e evento disparado pelo formulário quando é submetido.
   * @param {Typing=} type valor do tipo caso tenha sido definido na busca.
   */
  const onSearch = useCallback(
    async (e: FormEvent<HTMLFormElement>, type?: Typing) => {
      e.preventDefault();

      if (type) {
        onTypeChanged(type);
      } else if (input.current && input.current.value) {
        const inputValue = input.current.value;
        const value = inputValue.toLowerCase();

        setLoading(true);

        const request = await fetch("https://pokeapi.co/api/v2/pokemon-species?limit=10000");
        const response = await request.json();

        const { results } = response;

        const predicate = (x: NamedPokemon) => x.name.toLowerCase().includes(value);
        const newList = (results as Array<NamedPokemon>).filter(predicate);

        const list: Array<Pokemon> = [];
        for (const item of newList) {
          const request = await fetch(item.url.replace("-species", ""));
          const pokemon = (await request.json()) as Pokemon;
          list.push(pokemon);
        }

        setPokemon(list[0]);
        setPokemons(list);
        setPagination((pag) => ({ ...pag, pageNumber: 1, count: newList.length }));
        setLoading(false);
      } else {
        setPagination((pag) => ({ ...pag, pageNumber: 1 }));
      }
    },
    [onTypeChanged]
  );

  /**
   * Função responsável por fechar o drawer.
   * Quando acionado, fecha o drawer (versão mobile).
   */
  const onDrawerClose = useCallback(() => {
    setOpen(false);
  }, []);

  /**
   * Função responsável por paginar a listagem.
   * Quando acionado, caso o valor do campo de busca ou o tipo do pokemon tenha sido definido,
   * realiza a paginação, caso não, retorna a lista completa.
   *
   * @param {Array<Pokemon>} list lista de pokemons a serem paginada, ou não.
   * @param {PaginationProps} param1 objeto de paginação.
   * @returns lista de pokemons paginada.
   */
  const onSliceList = (list: Array<Pokemon>, { pageNumber, pageSize = 21 }: PaginationProps) => {
    if (input.current?.value || type) {
      return list.slice((pageNumber - 1) * pageSize, (pageNumber - 1) * pageSize + pageSize);
    }

    return list;
  };

  /**
   * Define a quantidade máxima de pokemons para o caso da busca de pokemons por tipo.
   */
  useEffect(() => {
    (async () => {
      const request = await fetch("https://pokeapi.co/api/v2/pokemon-species");
      const { count } = await request.json();
      setLastIndex(count);
    })();
  }, []);

  /**
   * Realizar a busca da listagem sempre que a página é alterada.
   * Quando acionado, coloca a tela em carregamento, pega a URL e aciona a busca.
   * Para cada item da lista retornado, busca o pokemon na API.
   * No final do processo, abre o primeiro pokemon da lista, adiciona a lista
   * para ser renderizada e finaliza o carregamento da página.
   */
  useEffect(() => {
    (async () => {
      if (input.current?.value || type) return;

      setLoading(true);

      const { pageNumber, pageSize = 21 } = pagination;
      const URL = `https://pokeapi.co/api/v2/pokemon-species?limit=${pageSize}&offset=${
        (pageNumber - 1) * pageSize
      }`;

      const request = await fetch(URL);
      const response = await request.json();

      const list: Array<Pokemon> = [];
      for (const item of response.results) {
        const request = await fetch(item.url.replace("-species", ""));
        const pokemon = (await request.json()) as Pokemon;
        list.push(pokemon);
      }

      setPokemon(list[0]);
      setPokemons(list);
      setPagination((pag) => ({ ...pag, count: response.count }));
      setLoading(false);
    })();
  }, [pagination.pageNumber, type]);

  return (
    <Fragment>
      <div className="flex flex-col gap-8">
        <div className="shadow-md rounded-md bg-component-light p-4 mb-4 dark:bg-component-dark-600">
          <div className="relative w-full">
            <form autoComplete="off" onSubmit={(e) => onSearch(e, type)}>
              <div className="flex gap-4">
                <Input
                  ref={input}
                  type="search"
                  name="search"
                  placeholder="Pesquisar"
                  addonBefore={<MagnifyingGlassIcon />}
                />

                <Select
                  placeholder="Tipo"
                  value={type}
                  icon={<OpacityIcon />}
                  onChange={onTypeChanged}
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

        <Spin.Loading spinning={loading}>
          {!!pokemons.length && (
            <Fragment>
              <div className="grid grid-cols-12 gap-6">
                <div className="col-span-12 xl:col-span-9">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {onSliceList(pokemons, pagination).map((pokemon) => (
                      <Card
                        key={pokemon.name}
                        loading={loading}
                        pokemon={pokemon}
                        onClick={() => onCardClick(pokemon)}
                      />
                    ))}
                  </div>
                </div>

                <div className="col-span-3 hidden xl:block">
                  <View loading={loading} pokemon={pokemon} onChange={setPokemon} />
                </div>
              </div>

              <div className="flex justify-center mt-8">
                <Pagination {...pagination} onChange={onPageChanged} />
              </div>
            </Fragment>
          )}

          {!pokemons.length && <Empty />}
        </Spin.Loading>
      </div>

      <Drawer expanded={expand} open={open} onChange={setExpand} onClose={onDrawerClose}>
        <View loading={loading} pokemon={pokemon} />
      </Drawer>
    </Fragment>
  );
}
