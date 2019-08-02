import cache from '../cache';

const lines = async (params) => (
  await cache('lines.json', params)
);

export default lines;