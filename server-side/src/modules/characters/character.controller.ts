import { NextFunction, Response, Request } from "express";
import Character from "./character.model.js";
import { CreateCharacterDto, UpdateCharacterDto } from "./character.dto.js";

export const getAllCharacters = async (
  req: Request<{ bookId: string }, any, any>,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { bookId } = req.params;

  const characters = await Character.find({ books: bookId });
  return res.status(200).json(characters);
};

export const getCharacterById = async (
  req: Request<{ bookId: string; characterId: string }, any, any>,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { characterId, bookId } = req.params;
  if (!characterId)
    return res.status(400).json({ error: "No character id is provided" });

  const character = await Character.findById(characterId);
  if (!character) return res.status(404).json({ error: "Character not found" });

  return res.status(200).json(character);
};

export const createCharacter = async (
  req: Request<{ bookId: string }, any, CreateCharacterDto>,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { name, description, narrativeRole } = req.body;
  console.log("Got to create character");
  if (!name || !description || !narrativeRole)
    return res
      .status(400)
      .json({ error: "The body does not have all the requred fields" });

  const { bookId } = req.params;

  const character = await Character.create({
    name,
    description,
    narrativeRole,
    books: [bookId],
  });
  if (!character)
    return res.status(500).json({ error: "Failed to create the character" });

  console.log("Basically go to the response");

  return res
    .status(201)
    .location(`/books/${bookId}/characters/${character._id}`)
    .json(character);
};

export const updateCharacter = async (
  req: Request<any, any, UpdateCharacterDto>,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { id, bookId } = req.params;
  if (!id) return res.status(400).json({ error: "No character id provided" });

  const { name, description, narrativeRole } = req.body;
  if (!name && !description && !narrativeRole)
    return res.status(400).json({ error: "Not a single change was sent" });

  // Check updates to be made
  const updates: UpdateCharacterDto = {};
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
  req: Request<{ characterId: string }, any, any>,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { characterId } = req.params;
  if (!characterId)
    return res.status(400).json({ error: "No character id provided" });

  const character = await Character.findByIdAndDelete(characterId);
  if (!character) return res.status(404).json({ error: "Character not found" });

  return res.status(200).json(character);
};
