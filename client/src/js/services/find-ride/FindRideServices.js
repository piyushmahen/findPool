import { raiseStatus, methods as HTTP } from '../../scripts/Http';

const findRideFetchApi = (coordinates) => {
  return fetch('/api/location-search', {
    method: HTTP.POST,
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(coordinates)
  })
  .then(raiseStatus);
};

export default findRideFetchApi