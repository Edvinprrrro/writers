import { NextFunction, Response, Request } from "express";
import Chapter from "./chapter.model.js";
import { NotFoundError } from "../../errors/notFoundError.js";
import getUpdates from "../../globalServices/getUpdates.js";
import { HttpError } from "../../errors/httpError.js";

export const createChapter = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const chapter = new Chapter();
    chapter.title = req.body.title;
    chapter.content = req.body.content;
    chapter.order = req.body.order;
    chapter.book = req.params.chapterId;
    await chapter.save();

    const location = req.originalUrl + chapter._id;
    return res.status(200).location(location).json(chapter);
  } catch (error: any) {
    return next(error);
  }
};

export const getAllChapters = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { bookId } = req.params;
    const chapters = await Chapter.find({ book: bookId });
    if (!chapters) throw new NotFoundError();

    return res.status(200).json(chapters);
  } catch (error: any) {
    return next(error);
  }
};

export const getChapterById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { chapterId } = req.params;
    const chapter = await Chapter.findById(chapterId);
    if (!chapter) throw new NotFoundError();

    return res.status(200).json(chapter);
  } catch (error: any) {
    return next(error);
  }
};

export const updateChapter = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { chapterId } = req.params;
    const updates = getUpdates(req.body);
    if (!updates) throw new HttpError(400, "No updates were sent");

    const chapter = await Chapter.findByIdAndUpdate(chapterId, updates);
    if (!chapter) throw new NotFoundError();

    const location = req.originalUrl + chapter._id;
    return res.status(200).location(location).json(chapter);
  } catch (error: any) {
    return next(error);
  }
};

export const deleteChapter = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { chapterId } = req.params;
    const chapter = await Chapter.findByIdAndDelete(chapterId);
    if (chapter) throw new NotFoundError();

    return res.status(200).json(chapter);
  } catch (error: any) {
    return next(error);
  }
};
