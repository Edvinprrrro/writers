import { setKey } from "@/utils/storageKeys";
import { api } from "./api";

export async function login(username: string, password: string) {
  try {
    const res = await api.post("/user/login", { username, password });
    const { accessToken, refreshToken } = res.data;

    await setKey("accessToken", accessToken);
    await setKey("refreshToken", refreshToken);

    return { ok: true };
  } catch (error: any) {
    return { ok: false, message: error.response.data.error };
  }
}

export async function register(
  email: string,
  username: string,
  password: string,
  repeatedPassword: string
) {
  try {
    const res = await api.post("/user/register", {
      email,
      username,
      password,
      repeatedPassword,
    });

    const { accessToken, refreshToken } = res.data;

    await setKey("accessToken", accessToken);
    await setKey("refreshToken", refreshToken);

    return { ok: true };
  } catch (error: any) {
    console.log("Error in function: ", error.response.data.error);
    return { ok: false, message: error.response.data.error };
  }
}
