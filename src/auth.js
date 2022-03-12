export const authenticate = (token, isBroadcaster = false) => {
  localStorage.setItem("login_data", JSON.stringify({ token, isBroadcaster }));
};

export const isAuthenticated = () => {
  const loginData = localStorage.getItem("login_data");
  return Boolean(loginData);
};

export const getToken = () =>
  JSON.parse(localStorage.getItem("login_data")).token;

export const isBroadcaster = () =>
  JSON.parse(localStorage.getItem("login_data")).isBroadcaster;

export const logout = () => {
  localStorage.removeItem("login_data");
  localStorage.removeItem("login_is_broadcaster");
};

function generateRandomString() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

export const generateAndSaveRandomState = () => {
  const state = generateRandomString();
  localStorage.setItem("login_state", state);
  return state;
};

export const isRandomStateEqualTo = (state) => {
  return state === localStorage.getItem("login_state");
};
