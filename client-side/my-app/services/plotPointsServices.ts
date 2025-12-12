import { api } from "./api";

export async function getAllPlotPoints(bookId: string) {
    try {
        const res = await api.get(`/${bookId}/plotPoints`);

        
    }
}