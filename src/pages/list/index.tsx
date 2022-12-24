import React, { FormEvent, Fragment, useCallback, useEffect, useRef, useState } from "react";
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
import { MagnifyingGlassIcon, OpacityIcon } from "@radix-ui/react-icons";
import { capitalize, getTypeIcon, getBgClassName, getUrlId } from "@utils";
import { useMediaQuery } from "@hooks";
import { TYPES } from "@constants";
import { PokemonClient, Pokemon, NamedAPIResource } from "pokenode-ts";

import { Typing } from "@types";

export function List() {
  const api = new PokemonClient();
  const input = useRef<HTMLInputElement>(null);
  const xl = useMediaQuery("(min-width: 1280px)");

  const [lastIndex, setLastIndex] = useState(0);
  const [search, setSearch] = useState("");
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
  const onCardClick = useCallback(
    (pokemon: Pokemon) => {
      setOpen(!xl);
      setExpand(true);
      setPokemon(pokemon);
    },
    [xl]
  );

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

      const { pokemon } = await api.getTypeByName(value);
      const results = pokemon.map((pokemon) => pokemon.pokemon);

      const find = input.current?.value?.toLowerCase();
      const filtered = results.filter((x) => {
        const url = x.url.split("/pokemon")[1];
        const id = url.replace(/\D/g, "");
        return Number(id) <= lastIndex && (!find || x.name.includes(find));
      });

      const list: Array<Pokemon> = [];
      for (const item of filtered) {
        const pokemon = await api.getPokemonByName(item.name);
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
   * sido definido {@link search} realiza a busca e filtro dos pokemons pelo nome.
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

        const { results } = await api.listPokemonSpecies(0, 10000);

        const predicate = (x: NamedAPIResource) => x.name.toLowerCase().includes(value);
        const newList = results.filter(predicate);

        const list: Array<Pokemon> = [];
        for (const item of newList) {
          const pokemon = await api.getPokemonByName(item.name);
          list.push(pokemon);
        }

        setPokemon(list[0]);
        setPokemons(list);
        setPagination((pag) => ({ ...pag, pageNumber: 1, count: newList.length }));
        setSearch(inputValue);
        setLoading(false);
      } else {
        setPagination((pag) => ({ ...pag, pageNumber: 1 }));
        setSearch("");
      }
    },
    [onTypeChanged]
  );

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
    if (search || type) {
      return list.slice((pageNumber - 1) * pageSize, (pageNumber - 1) * pageSize + pageSize);
    }

    return list;
  };

  /**
   * Define a quantidade máxima de pokemons para o caso da busca de pokemons por tipo.
   */
  useEffect(() => {
    (async () => {
      const { count } = await api.listPokemonSpecies();
      setLastIndex(count);
    })();
  }, []);

  /**
   * Define se o Drawer está aberto ou fechado,
   * apenas se a tela for menor que xl.
   */
  useEffect(() => {
    setOpen((open) => open && !xl);
  }, [xl]);

  /**
   * Realizar a busca da listagem sempre que a página é alterada.
   * Quando acionado, coloca a tela em carregamento, pega a URL e aciona a busca.
   * Para cada item da lista retornado, busca o pokemon na API.
   * No final do processo, abre o primeiro pokemon da lista, adiciona a lista
   * para ser renderizada e finaliza o carregamento da página.
   */
  useEffect(() => {
    (async () => {
      if (search || type) return;

      setLoading(true);

      const { pageNumber, pageSize = 21 } = pagination;
      const offset = (pageNumber - 1) * pageSize;

      const { results, count } = await api.listPokemonSpecies(offset, pageSize);

      const list: Array<Pokemon> = [];
      for (const { url } of results) {
        const id = getUrlId(url, "pokemon-species");
        const pokemon = await api.getPokemonById(Number(id));
        list.push(pokemon);
      }

      setPokemon(list[0]);
      setPokemons(list);
      setPagination((pag) => ({ ...pag, count }));
      setLoading(false);
    })();
  }, [pagination.pageNumber, type, search]);

  return (
    <Drawer open={open} onOpenChange={setOpen} onExpandChange={setExpand}>
      <div className="flex flex-col gap-8">
        <div className="shadow-md rounded-md bg-component-light p-4 mb-4 dark:bg-component-dark-600">
          <div className="relative w-full">
            <form autoComplete="off" onSubmit={(e) => onSearch(e, type)}>
              <div className="flex gap-4">
                <Input
                  ref={input}
                  type="search"
                  name="search"
                  defaultValue={search}
                  placeholder="Pesquisar"
                  addonBefore={<MagnifyingGlassIcon />}
                />

                <Select
                  placeholder="Tipo"
                  value={type}
                  icon={<OpacityIcon />}
                  onChange={onTypeChanged}
                >
                  {TYPES.map((type) => (
                    <Select.Option
                      key={type}
                      value={type}
                      icon={
                        <div
                          className={`flex justify-center items-center w-4 h-4 rounded-full ${getBgClassName(
                            type
                          )}`}
                        >
                          {React.createElement(getTypeIcon(type), { className: "w-3" })}
                        </div>
                      }
                    >
                      {capitalize(type)}
                    </Select.Option>
                  ))}
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
                        onClick={onCardClick}
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

      <Drawer.Content expanded={expand}>
        <View loading={loading} pokemon={pokemon} onChange={setPokemon} />
      </Drawer.Content>
    </Drawer>
  );
}
