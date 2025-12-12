import { api } from "./api";
import { RequestResults } from "@/utils/types";

export async function getBooks(): Promise<RequestResults> {
  try {
    const res = await api.get("/books");

    return { ok: true, data: res.data };
  } catch (error: any) {
    if (error.response) {
      return {
        ok: false,
        type: "backend",
        message: error.response.data!.error,
      };
    }

    return {
      ok: false,
      type: "network",
      message: error.message || "Unknown error",
    };
  }
}
