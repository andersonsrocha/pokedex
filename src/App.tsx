import { useContext, useEffect, useState } from "react";
import { Card, PageChangeEvent, Pagination, PaginationProps, Spin } from "@components";

import { LayoutContext } from "./layout";

import { Pokemon } from "@types";

export function App() {
  const { search } = useContext(LayoutContext);

  const [loading, setLoading] = useState(false);
  const [pokemons, setPokemons] = useState<Array<Pokemon>>([]);
  const [pagination, setPagination] = useState<PaginationProps>({ count: 0, pageNumber: 1 });

  const onPageChanged = ({ pageNumber, pageSize }: PageChangeEvent) => {
    setPagination((pag) => ({ ...pag, pageNumber, pageSize }));
  };

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
        const response = (await request.json()) as Pokemon;
        list.push(response);
      }

      setPokemons(list);
      setPagination((pag) => ({ ...pag, count: filtered.count }));

      setLoading(false);
    })();
  }, [pagination.pageNumber, search]);

  return (
    <Spin spinning={loading}>
      <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6">
        {pokemons.map((pokemon) => (
          <Card key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <Pagination {...pagination} onChange={onPageChanged} />
      </div>
    </Spin>
  );
}
