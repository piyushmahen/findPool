import { raiseStatus, methods as HTTP } from '../../scripts/Http';

const registerFetchApi = (registerForm) => {
  return fetch('/api/register', {
    method: HTTP.POST,
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(registerForm)
  })
  .then(raiseStatus);
};

export default registerFetchApi