export const authenticate = token => {
  localStorage.setItem("login_data", JSON.stringify({ token }));
};

export const isAuthenticated = () => {
  const loginData = localStorage.getItem("login_data");
  return Boolean(loginData);
};

export const getToken = () =>
  JSON.parse(localStorage.getItem("login_data")).token;

export const logout = () => localStorage.removeItem("login_data");
