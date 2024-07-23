export const getLocalUserData = () => localStorage.getItem("useInfo");
export const setLocalUserData = (data) =>
  localStorage.setItem("userInfo", data);

export const LocalStoargeKeys = { USERINFO: "userInfo" };
