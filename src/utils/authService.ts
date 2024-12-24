import Cookie from "js-cookie";
import { TOKEN_STORAGE_KEY, USER_ROLE_KEY } from "./constants";

const useAuthService = () => {
  const storeToken = (token: string, roleId: string) => {
    Cookie.set(TOKEN_STORAGE_KEY, token, { secure: true });
    Cookie.set(USER_ROLE_KEY, roleId, { secure: true });
  };
  const clearToken = () => {
    Cookie.remove(TOKEN_STORAGE_KEY);
    Cookie.remove(USER_ROLE_KEY);
  };

  const getToken = (): string | undefined => {
    return Cookie.get(TOKEN_STORAGE_KEY);
  };
  const getUserRoleId = () => {
    return Number(Cookie.get(USER_ROLE_KEY));
  };

  return {
    storeToken,
    clearToken,
    getToken,
    getUserRoleId,
  };
};

export default useAuthService;
