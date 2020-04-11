import * as t from 'io-ts';
import { get } from '../utils/http';

export const Person = t.strict({
  id: t.string,
  name: t.string,
});
export type Person = t.TypeOf<typeof Person>;

export const SearchResponse = t.array(Person);

export type SearchResponse = t.TypeOf<typeof SearchResponse>;

interface SearchPersonQuery {
  search: string;
}
export async function searchPersons({ query }: { query: SearchPersonQuery }): Promise<Person[]> {
  const res = await get(SearchResponse, {
    url: `${window.ENV_DATA.personApiOrigin}/persons/search?searchTerms=${query.search}`,
  });

  return res;
}

interface GetPersonQuery {
  id: string;
}
export async function getPerson({ query }: { query: GetPersonQuery }): Promise<Person> {
  const res = await get(Person, {
    url: `${window.ENV_DATA.personApiOrigin}/persons/${query.id}`,
  });

  return res;
}
