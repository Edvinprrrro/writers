import { NextFunction, Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import Character from "../models/Character";
import { ICharacterInfo } from "../types/Character";

interface BookIdRequest extends AuthRequest {
  params: {
    bookId: string;
  };
}

export const getAllCharacters = async (
  req: BookIdRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { bookId } = req.params;

  const characters = await Character.find({ books: bookId });
  return res.status(200).json(characters);
};

interface IdRequest extends AuthRequest {
  params: {
    id: string;
    bookId: string;
  };
}

export const getCharacterById = async (
  req: IdRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { id, bookId } = req.params;
  if (!id)
    return res.status(400).json({ error: "No character id is provided" });

  const character = await Character.findById(id);
  if (!character) return res.status(404).json({ error: "Character not found" });

  return res.status(200).json(character);
};

interface CreateCharacterRequest extends BookIdRequest {
  body: ICharacterInfo;
}

export const createCharacter = async (
  req: CreateCharacterRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { name, description, role } = req.body;
  if (!name || !description || !role)
    return res
      .status(400)
      .json({ error: "The body does not have all the requred fields" });

  const { bookId } = req.params;

  const character = await Character.create({
    name,
    description,
    role,
    books: [bookId],
  });
  if (!character)
    return res.status(500).json({ error: "Failed to create the character" });

  return res
    .status(201)
    .location(`/books/${bookId}/characters/${character._id}`);
};

interface UpdateCharacterRequest extends IdRequest {
  body: Partial<ICharacterInfo>;
}

export const updateCharacter = async (
  req: UpdateCharacterRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { id, bookId } = req.params;
  if (!id) return res.status(400).json({ error: "No character id provided" });

  const { name, description, role } = req.body;
  if (!name && !description && !role)
    return res.status(400).json({ error: "Not a single change was sent" });

  // Check updates to be made
  const updates: Partial<ICharacterInfo> = {};
  Object.entries(req.body).forEach(([key, value]) => {
    if (value !== undefined) (updates as any)[key] = value;
  });

  const character = await Character.findByIdAndUpdate(id, updates);
  if (!character)
    return res
      .status(500)
      .json({ error: "An error updating the character ocurred" });

  return res
    .status(200)
    .location(`/books/${bookId}/characters/${id}`)
    .json(character);
};

export const deleteCharacter = async (
  req: IdRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "No character id provided" });

  const character = await Character.findByIdAndDelete(id);
  if (!character) return res.status(404).json({ error: "Character not found" });

  return res.status(200).json(character);
};
