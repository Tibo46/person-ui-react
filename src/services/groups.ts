import * as t from 'io-ts';
import { get } from '../utils/http';

export const Group = t.strict({
  id: t.string,
  name: t.string,
});
export type Group = t.TypeOf<typeof Group>;

export const GroupResponse = t.array(Group);

export type GroupResponse = t.TypeOf<typeof GroupResponse>;
export async function getTypes(): Promise<Group[]> {
  const res = await get(GroupResponse, {
    url: `${window.ENV_DATA.personApiOrigin}/groups`,
  });

  return res;
}
