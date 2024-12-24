import CryptoJS from "crypto-js";

export const handleFetchResponse = async (res, resolve, reject) => {
  if (res?.status) {
    const data = await res.json();
    resolve(data?.data);
  } else {
    const errorResponse = await res.json();
    reject(errorResponse);
  }
};

/** Encrypt Decrypt Data */
const cryptoSecret = process.env.CRYPTO_KEY ?? "";
export function Encrypt(values: any) {
  const encJson = CryptoJS.AES.encrypt(
    JSON.stringify(values),
    cryptoSecret
  ).toString();
  const encData = CryptoJS.enc.Base64.stringify(
    CryptoJS.enc.Utf8.parse(encJson)
  );
  return encData;
}
export function Decrypt(values: string | null) {
  let bytes = null;
  try {
    const decData = CryptoJS.enc.Base64.parse(
      values == null ? "" : values
    ).toString(CryptoJS.enc.Utf8);
    bytes = CryptoJS.AES.decrypt(decData, cryptoSecret).toString(
      CryptoJS.enc.Utf8
    );
  } catch (e) {}
  return bytes ? JSON.parse(bytes) : {};
}

/** Parse JWT Data */
export const parseJwt = (token: string) => {
  try {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    return null;
  }
};

export const removeInitialSpace = (value: string) => value.replace(/^\s+/g, "");

export const convertTwoDecimalPlaces = (value: number | string) => {
  let result;
  if (typeof value === "number") {
    result = value.toFixed(2);
  } else if (typeof value !== "number") {
    result = Number(value).toFixed(2);
  }
  return `$${result}`;
};

export const saveTokenForResendApi = (token: string) => {
  localStorage.setItem("tokenForResendApi", token);
};

export const getTokenForResendApi = () => {
  const token = localStorage.getItem("tokenForResendApi");
  return token;
};

export const clearTokenForResendApi = () => {
  localStorage.removeItem("tokenForResendApi");
};
