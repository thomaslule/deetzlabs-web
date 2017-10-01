import jsCookie from 'js-cookie';
import clone from 'clone';

const post = (path, params, callback = () => {}) => {
  const body = clone(params);
  if (!body.secret) body.secret = jsCookie.get('secret');
  fetch(`/api/${path}`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then((res) => {
    if (res.ok) {
      callback(null, res);
    } else {
      callback('request unsuccessful');
    }
  });
};

const api = {
  checkSecret: (secret, callback) => {
    post('check_secret', { secret }, (err, res) => {
      callback(err, res);
    });
  },

  test: () => {
    post('test', {});
  },
};

export default api;
