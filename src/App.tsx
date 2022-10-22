import { useContext, useEffect, useState } from "react";
import {
  Card,
  Empty,
  Modal,
  PageChangeEvent,
  Pagination,
  PaginationProps,
  Skeleton,
  Spin,
} from "@components";

import { LayoutContext } from "./layout";

import { Description, Genera, Pokemon } from "@types";

export function App() {
  const { search } = useContext(LayoutContext);

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [pokemons, setPokemons] = useState<Array<Pokemon>>([]);
  const [pagination, setPagination] = useState<PaginationProps>({ count: 0, pageNumber: 1 });

  const find = (list: Array<Pokemon>, pageNumber: number, pageSize: number) => {
    const value = search.toLowerCase();
    const pokemons = list.filter((x) => x.name.toLowerCase().includes(value));
    const sliced = pokemons.slice(
      (pageNumber - 1) * pageSize,
      (pageNumber - 1) * pageSize + pageSize
    );

    return {
      count: pokemons.length,
      results: sliced,
    };
  };

  const onCardClick = (pokemon: Pokemon) => {
    setOpen(true);
    setPokemon(pokemon);
  };

  const onPageChanged = ({ pageNumber, pageSize }: PageChangeEvent) => {
    setPagination((pag) => ({ ...pag, pageNumber, pageSize }));
  };

  useEffect(() => {
    setPagination((pag) => ({ ...pag, pageNumber: 1 }));
  }, [search]);

  useEffect(() => {
    (async () => {
      setLoading(true);

      const { pageNumber, pageSize = 20 } = pagination;

      const url = search
        ? `https://pokeapi.co/api/v2/pokemon-species?limit=10000`
        : `https://pokeapi.co/api/v2/pokemon-species?limit=${pageSize}&offset=${
            (pageNumber - 1) * pageSize
          }`;
      const request = await fetch(url);
      const response = await request.json();
      const filtered = search ? find(response.results, pageNumber, pageSize) : response;

      const list: Array<Pokemon> = [];
      for (const item of filtered.results) {
        const request = await fetch(item.url.replace("-species", ""));
        const pokemon = (await request.json()) as Pokemon;
        list.push(pokemon);
      }

      setPokemons(list);
      setPagination((pag) => ({ ...pag, count: filtered.count }));
      setLoading(false);
    })();
  }, [pagination.pageNumber, search]);

  return (
    <Spin spinning={loading}>
      <div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 min-h-[calc(100vh-208px)]">
          {pokemons.map((pokemon) => (
            <Card key={pokemon.name} pokemon={pokemon} onClick={() => onCardClick(pokemon)} />
          ))}
        </div>

        {!pokemons.length && <Empty />}

        <div className="mt-8 flex justify-center">
          <Pagination {...pagination} onChange={onPageChanged} />
        </div>
      </div>

      <Modal
        open={open}
        pokemon={pokemon}
        onClose={() => setOpen(false)}
        onClick={(pokemon) => setPokemon(pokemon)}
      />
    </Spin>
  );
}