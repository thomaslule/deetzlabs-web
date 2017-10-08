import jsCookie from 'js-cookie';

const post = (path, params = {}, callback = () => {}) => {
  fetch(`/api/${path}`, {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: jsCookie.get('token') ? `Bearer ${jsCookie.get('token')}` : null,
    },
  }).then((res) => {
    if (res.ok) {
      callback(null, res);
    } else {
      callback('request unsuccessful');
    }
  });
};

const get = (path, callback = () => {}) => {
  fetch(`/api/${path}`, {
    method: 'GET',
    headers: {
      Authorization: jsCookie.get('token') ? `Bearer ${jsCookie.get('token')}` : null,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    callback('request unsuccessful');
    return Promise.reject();
  }).then(json => callback(null, json));
};

const api = {

  login: (username, password, callback) => {
    post('login', { username, password }, (err, res) => {
      if (err) return callback(err);
      if (!res.ok) return callback('request unsuccessful');
      return res.text().then(token => callback(null, token));
    });
  },

  test: () => {
    post('test');
  },

  makeBenefactor: (user) => {
    post('achievement', {
      achievement: 'benefactor',
      user: {
        username: user.toLowerCase(),
        'display-name': user,
      },
    });
  },

  getLastAchievements: (callback) => {
    get('last_achievements', (err, list) => {
      if (!err) callback(list);
    });
  },

  getAllAchievements: (callback) => {
    get('all_achievements', (err, list) => {
      if (!err) callback(list);
    });
  },

  replayAchievement: (achievement, username) => {
    post('replay_achievement', {
      achievement,
      username,
    });
  },

  getViewers: (callback) => {
    get('viewers', callback);
  },

  getAlertVolume: (callback) => {
    get('alert_volume', callback);
  },

  postAlertVolume: (volume) => {
    post('alert_volume', { volume });
  },
};

export default api;
