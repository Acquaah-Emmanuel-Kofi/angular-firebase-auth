export const ACCESS_TOKEN_KEY: string = 'APP_ACCESS_TOKEN';

export const saveToLocalStorage = (key: string, value: any) => {
  return localStorage.setItem(key, value);
};

export const getFromLocalStorage = (key: string) => {
  return localStorage.getItem(key);
};

export const removeFromLocalStorage = (key: string) => {
  return localStorage.removeItem(key);
};
