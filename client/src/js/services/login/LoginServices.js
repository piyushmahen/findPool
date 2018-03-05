import { raiseStatus, methods as HTTP } from '../../scripts/Http';

const loginFetchApi = (credentials) => {
  return fetch('/api/login', {
    method: HTTP.POST,
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials)
  })
  .then(raiseStatus);
};

export default loginFetchApi