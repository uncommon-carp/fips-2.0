import { fetchS3Object } from '@fips/shared';
import Fuse from 'fuse.js';

export const getCountyByStateAndName = async (
  state: string,
  county: string,
) => {
  const countyList = await fetchS3Object('county-bucket', 'fips_list.json');
  const parsedList = JSON.parse(countyList);

  const options = {
    keys: ['state', 'county'],
    threshold: 0.0,
  };
  const fuse = new Fuse(parsedList, options);

  const result = fuse.search({ state: state.toUpperCase(), county });

  if (result.length > 0) {
    return [result[0].item];
  }

  return [];
};
