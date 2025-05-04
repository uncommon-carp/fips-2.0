import { fetchS3Object } from '@fips/shared';
import Fuse from 'fuse.js';

export const getCountyByStateAndName = async (
  state: string,
  county: string,
) => {
  const countyList = await fetchS3Object('county-bucket', 'fips_list.json');
  const parsedList = JSON.parse(countyList);

  const normalizedState = state.toUpperCase();
  console.log('getCountyByStateAndName:\n', { state: normalizedState, county });

  const options = {
    keys: ['state', 'county'],
  };
  const fuse = new Fuse(parsedList, options);

  const result = fuse.search({ state: state.toUpperCase(), county });

  return result[0].item;
};
