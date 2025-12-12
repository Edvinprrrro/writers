import { api } from "./api";
import { RequestResults } from "@/utils/types";

export async function getCharacters(bookId: string): Promise<RequestResults> {
  try {
    const res = await api.get(`/books/${bookId}/characters/all`);

    return { ok: true, data: res.data };
  } catch (error: any) {
    if (error.response) {
      return {
        ok: false,
        type: "backend",
        message: error.response.data!.error,
      };
    }

    return { ok: false, type: "backend", message: error.message || "Unknown" };
  }
}
