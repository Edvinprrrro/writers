import * as z from "zod";

export const getCharacterByIdSchema = z.object({
  params: z.object({
    characterId: z.string().min(1),
    bookId: z.string().min(1),
  }),
});

export const deleteCharacterSchema = z.object({
  params: z.object({
    characterId: z.string().min(1),
    bookId: z.string().min(1),
  }),
});

export const createCharacterSchema = z.object({
  params: z.object({
    bookId: z.string().min(1),
  }),
  body: z.object({
    name: z.string().min(1),
    description: z.string().optional(),
    narrativeRole: z.string().optional(),
  }),
});

export const getAllCharactersSchema = z.object({
  params: z.object({
    bookId: z.string().min(1),
  }),
});

export const updateCharacterSchema = z.object({
  params: z.object({
    characterId: z.string().min(1),
    bookId: z.string().min(1),
  }),
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    narrativeRole: z.string().optional(),
  }),
});
