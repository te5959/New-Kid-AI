const ACCESS_KEY = "brightbyte_access";
const REFRESH_KEY = "brightbyte_refresh";

export const setTokens = (accessToken: string, refreshToken: string) => {
  sessionStorage.setItem(ACCESS_KEY, accessToken);
  localStorage.setItem(REFRESH_KEY, refreshToken);
};

export const getAccessToken = () => sessionStorage.getItem(ACCESS_KEY);

export const getRefreshToken = () => localStorage.getItem(REFRESH_KEY);

export const clearTokens = () => {
  sessionStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
};
