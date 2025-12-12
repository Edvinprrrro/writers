import * as SecureStore from "expo-secure-store";
import { api } from "../services/api";

async function refreshTokens() {
  try {
    const oldRefreshToken = await SecureStore.getItemAsync("refreshToken");

    const res = await api.post("/refreshTokens", null, {
      headers: { Authorization: `Bearer ${oldRefreshToken}` },
    });

    const { accessToken, refreshToken } = res.data;

    await SecureStore.setItemAsync("accessToken", accessToken);
    await SecureStore.setItemAsync("refreshToken", refreshToken);
  } catch (error) {
    throw error;
  }
}
