export interface Book {
  _id: string; // Mongoose ObjectId as string
  title: string;
  description?: string;
  author: string; // User ObjectId
  createdAt: string;
  updatedAt: string;
}

export interface CharacterType {
  _id: string;
  name: string;
  description: string;
  role: string;
}

export interface PlotPointType {
  _id: string;
  title: string;
  content: string;
  order: number;
}

export type RequestResults =
  | { ok: true; data: any }
  | { ok: false; type: "backend"; message: string }
  | { ok: false; type: "network"; message: string };
