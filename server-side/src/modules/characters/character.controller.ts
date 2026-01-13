import { NextFunction, Response, Request } from "express";
import Character from "./character.model.js";
import { NotFoundError } from "../../errors/notFoundError.js";
import { HttpError } from "../../errors/httpError.js";
import getUpdates from "../../globalServices/getUpdates.js";

export const getAllCharacters = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { bookId } = req.params;
    const characters = await Character.find({ books: [bookId] });
    if (!characters) throw new NotFoundError();

    return res.status(200).json(characters);
  } catch (error: any) {
    return next(error);
  }
};

export const getCharacterById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { characterId } = req.params;
    const character = await Character.findById(characterId);
    if (!character) throw new NotFoundError();

    return res.status(200).json(character);
  } catch (error: any) {
    return next(error);
  }
};

export const createCharacter = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const character = new Character();
    character.name = req.body.name;
    character.description = req.body.description;
    character.narrativeRole = req.body.narrativeRole;
    character.books.push(req.params.bookId);
    await character.save();

    const location = req.originalUrl + character._id;
    return res.status(201).location(location).json(character);
  } catch (error: any) {
    return next(error);
  }
};

export const updateCharacter = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { characterId } = req.params;
    const updates = getUpdates(req.body);
    if (!updates) throw new HttpError(400, "No updates were sent");

    const character = await Character.findByIdAndUpdate(characterId, updates);
    if (!character) throw new NotFoundError();

    const location = req.originalUrl + character._id;
    return res.status(200).location(location).json(character);
  } catch (error: any) {
    return next(error);
  }
};

export const deleteCharacter = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { characterId } = req.params;
    const character = await Character.findByIdAndDelete(characterId);
    if (!character) throw new NotFoundError();

    return res.status(200).json(character);
  } catch (error: any) {
    return next(error);
  }
};
