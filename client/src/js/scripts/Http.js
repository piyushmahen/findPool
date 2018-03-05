
const methods = {
  GET: 'GET',
  POST: 'POST',
};

const raiseStatus = (response) => {
  if (response.redirected) {
    window.location.href = response.url;
  }

  if (response.status >= 200 && response.status < 300) {
    return response.json();
  }

  const error = new Error(response.status);
  error.response = response;
  throw error;
};

export { methods, raiseStatus };
