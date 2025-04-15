import { fetchS3Object } from '@fips/shared/src/utils/s3/fetchS3Object';
import Fuse from 'fuse.js';

export const getCountyByStateAndName = async (
  state: string,
  county: string,
) => {
  const countyList = await fetchS3Object('county-bucket', 'fips_list.json');
  const parsedList = JSON.parse(countyList);

  const options = {
    keys: ['state', 'county'],
  };
  const fuse = new Fuse(parsedList, options);

  const result = fuse.search({ state, county });

  return result[0].item;
};
