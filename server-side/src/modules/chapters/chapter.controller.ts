import { NextFunction, Response, Request } from "express";
import Chapter from "./chapter.model.js";
import { CreateChapterDto, UpdateChapterDto } from "./chapter.dto.js";

const createChapter = async (
  req: Request<{ bookId: string }, any, CreateChapterDto>,
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

const getAllChapters = async (
  req: Request<{ bookId: string }, any, any>,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { bookId } = req.params;

  const chapters = await Chapter.find({ book: bookId });

  return res.status(200).json({ chapters });
};

const getChapterById = async (
  req: Request<{ bookId: string; chapterId: string }, any, any>,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { chapterId } = req.params;
  if (!chapterId)
    return res.status(400).json({ error: "No chapter id provided" });

  const chapter = await Chapter.findById(chapterId);

  if (!chapter) return res.status(404).json({ error: "Chapter not found" });

  return res.status(200).json(chapter);
};

const updateChapter = async (
  req: Request<{ bookId: string; chapterId: string }, any, UpdateChapterDto>,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { chapterId, bookId } = req.params;
  if (!chapterId)
    return res.status(400).json({ error: "No chapter id provided" });

  const { title, order, content } = req.body;
  if (!title && !order && !content)
    return res
      .status(400)
      .json({ error: "Not a single change was sent in the request" });

  // Check updates to be made
  const updates: UpdateChapterDto = {};
  Object.entries(req.body).forEach(([key, value]) => {
    if (value !== undefined) (updates as any)[key] = value;
  });

  const chapter = await Chapter.findByIdAndUpdate(chapterId, updates);
  if (!chapter)
    return res
      .status(500)
      .json({ error: "An error ocurred when updating the chapter" });

  return res
    .status(200)
    .location(`books/${bookId}/chapters/${chapter._id}`)
    .json(chapter);
};

const deleteChapter = async (
  req: Request<{ chapterId: string }, any, any>,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { chapterId } = req.params;
  if (!chapterId)
    return res.status(400).json({ error: "No chapter id provided" });

  const chapter = await Chapter.findByIdAndDelete(chapterId);
  if (!chapter)
    return res
      .status(500)
      .json({ error: "An error ocurred deleting the chapter" });

  return res.status(200).json(chapter);
};

export default {
  createChapter,
  deleteChapter,
  getAllChapters,
  updateChapter,
  getChapterById,
};
