import client from './client';

const stopMonitoring = async (params) => (
  await client('stop-monitoring', params)
);

export default stopMonitoring;