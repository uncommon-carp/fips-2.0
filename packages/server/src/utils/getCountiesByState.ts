import { fetchS3Object } from '@fips/shared';
import Fuse from 'fuse.js';

export const getCountiesByState = async (state: string) => {
  const fileContents = await fetchS3Object('county-bucket', 'fips_list.json');

  const countyList = JSON.parse(fileContents);

  const options = {
    keys: ['state'],
  };
  const fuse = new Fuse(countyList, options);

  const results = fuse.search(state);
  const counties = results.map((county) => county.item);

  return counties;
};
