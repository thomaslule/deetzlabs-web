export const authenticate = (token) => {
  localStorage.setItem("login_data", JSON.stringify({ token }));
};

export const isAuthenticated = () => {
  const loginData = localStorage.getItem("login_data");
  return Boolean(loginData);
};

export const getToken = () =>
  JSON.parse(localStorage.getItem("login_data")).token;

export const logout = () => localStorage.removeItem("login_data");

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
