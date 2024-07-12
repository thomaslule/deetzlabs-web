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
  return Array.from(crypto.getRandomValues(new Uint8Array(20)), (dec) =>
    dec.toString(16).padStart(2, "0")
  ).join("");
}

export const generateAndSaveRandomState = () => {
  const state = generateRandomString();
  localStorage.setItem("login_state", state);
  return state;
};

export const isRandomStateEqualTo = (state) => {
  return state === localStorage.getItem("login_state");
};
