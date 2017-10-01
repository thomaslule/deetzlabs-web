const api = {
  checkSecret: (secret, callback) => {
    fetch('/api/check_secret', {
      method: 'POST',
      body: JSON.stringify({
        secret,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((res) => {
      callback(res.ok);
    });
  },
};

export default api;
