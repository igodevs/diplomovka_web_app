export const saveAuthTokenInSession = (token: string) => {
  window.sessionStorage.setItem('token', token);
};

export const getAuthTokenFromSession = (): string | null => {
  return window.sessionStorage.getItem('token');
};
