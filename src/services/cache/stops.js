import cache from '../cache';

const stops = async (params) => (
  await cache('stops.json', params)
);

export default stops;