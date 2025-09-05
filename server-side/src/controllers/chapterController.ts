import { NextFunction, Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import Chapter from "../models/Chapter";
import { IChapterInfo } from "../types/Chapter";

interface CreateChapterRequest extends AuthRequest {
  body: IChapterInfo;
  params: {
    bookId: string;
  };
}

export const createChapter = async (
  req: CreateChapterRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { bookId } = req.params;
  const { content, title, order } = req.body;
  if (!content || !title || !order)
    return res
      .status(400)
      .json({ error: "The body does not have all required fields" });

  const chapter = await Chapter.create({
    content,
    title,
    order,
    book: bookId,
  });
  if (!chapter)
    return res
      .status(500)
      .json({ error: "Failed to add the chapter to the database" });

  return res
    .status(201)
    .location(`books/${bookId}/chapters/${chapter._id}`)
    .json({ chapter });
};

interface GetAllChaptersReqeust extends AuthRequest {
  params: {
    bookId: string;
  };
}

export const getAllChapters = async (
  req: GetAllChaptersReqeust,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { bookId } = req.params;

  const chapters = await Chapter.find({ book: bookId });

  return res.status(200).json({ chapters });
};

interface ChapterIdRequest extends AuthRequest {
  params: {
    bookId: string;
    id: string;
  };
}

export const getChapterById = async (
  req: ChapterIdRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "No chapter id provided" });

  const chapter = await Chapter.findById(id);

  if (!chapter) return res.status(404).json({ error: "Chapter not found" });

  return res.status(200).json(chapter);
};

interface UpdateChapterRequest extends ChapterIdRequest {
  body: Partial<IChapterInfo>;
}

export const updateChapter = async (
  req: UpdateChapterRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { id, bookId } = req.params;
  if (!id) return res.status(400).json({ error: "No chapter id provided" });

  const { title, order, content } = req.body;
  if (!title && !order && !content)
    return res
      .status(400)
      .json({ error: "Not a single change was sent in the request" });

  // Check updates to be made
  const updates: Partial<IChapterInfo> = {};
  Object.entries(req.body).forEach(([key, value]) => {
    if (value !== undefined) (updates as any)[key] = value;
  });

  const chapter = await Chapter.findByIdAndUpdate(id, updates);
  if (!chapter)
    return res
      .status(500)
      .json({ error: "An error ocurred when updating the chapter" });

  return res
    .status(200)
    .location(`books/${bookId}/chapters/${chapter._id}`)
    .json(chapter);
};

export const deleteChapter = async (
  req: ChapterIdRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ error: "No chapter id provided" });

  const chapter = await Chapter.findByIdAndDelete(id);
  if (!chapter)
    return res
      .status(500)
      .json({ error: "An error ocurred deleting the chapter" });

  return res.status(200).json(chapter);
};
