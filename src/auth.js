export const authenticate = (token, expiresAt) => {
  localStorage.setItem("login_data", JSON.stringify({ token, expiresAt }));
};

export const isAuthenticated = () => {
  const loginData = localStorage.getItem("login_data");
  return loginData && Date.now() < JSON.parse(loginData).expiresAt;
};

export const getToken = () =>
  JSON.parse(localStorage.getItem("login_data")).token;

export const logout = () => localStorage.removeItem("login_data");
