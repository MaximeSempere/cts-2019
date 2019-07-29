import client from './client';

const estimatedTimetable = async (params) => (
  await client('estimated-timetable', params)
);

export default estimatedTimetable;