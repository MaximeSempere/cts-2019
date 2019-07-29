import client from './client';

const linesDiscovery = async (params) => (
  await client('lines-discovery', params)
);

export default linesDiscovery;