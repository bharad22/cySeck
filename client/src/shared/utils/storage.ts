import { STORAGE_KEYS } from "../constants";

export const storage = {
  get: (key: string) => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(key);
  },

  set: (key: string, value: string) => {
    if (typeof window === "undefined") return;
    localStorage.setItem(key, value);
  },

  remove: (key: string) => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(key);
  },

  clear: () => {
    if (typeof window === "undefined") return;
    localStorage.clear();
  },
};

export const authStorage = {
  getToken: () => storage.get(STORAGE_KEYS.TOKEN),
  setToken: (token: string) => storage.set(STORAGE_KEYS.TOKEN, token),
  removeToken: () => storage.remove(STORAGE_KEYS.TOKEN),

  getIdentifier: () => storage.get(STORAGE_KEYS.IDENTIFIER),
  setIdentifier: (identifier: string) =>
    storage.set(STORAGE_KEYS.IDENTIFIER, identifier),
  removeIdentifier: () => storage.remove(STORAGE_KEYS.IDENTIFIER),

  getTokenExpiry: () => storage.get("token_expiry"),
  setTokenExpiry: (expiry: string) => storage.set("token_expiry", expiry),
  removeTokenExpiry: () => storage.remove("token_expiry"),

  isTokenExpired: () => {
    const expiry = storage.get("token_expiry");
    if (!expiry) return true;
    return Date.now() > parseInt(expiry);
  },

  clearAuth: () => {
    authStorage.removeToken();
    authStorage.removeIdentifier();
    authStorage.removeTokenExpiry();
  },
};
