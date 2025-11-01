import { Response, NextFunction } from "express";
import { AuthRequest } from "../middleware/authAccessTokenMiddleware.ts";
import PlotPoint from "../models/PlotPoint";
import { IPlotPointInfo } from "../types/PlotPoint";
import Book from "../models/Book";

interface BookIdRequest extends AuthRequest {
  params: {
    bookId: string;
  };
}

export const getPlotPoints = async (
  req: BookIdRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { bookId } = req.params;

  const plotPoints = await PlotPoint.find({ book: bookId });
  return res.status(200).json(plotPoints);
};

interface IdRequest extends AuthRequest {
  params: {
    id: string;
    bookId: string;
  };
}

export const getPlotPoint = async (
  req: IdRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { id } = req.params;
  if (!id)
    return res.status(400).json({ error: "Plot point id was not provided" });

  const plotPoint = await PlotPoint.findById(id);
  if (!plotPoint)
    return res.status(404).json({ error: "Plot point not found" });

  return res.status(200).json(plotPoint);
};

interface CreatePlotPointRequest extends BookIdRequest {
  body: IPlotPointInfo;
}

export const createPlotPoint = async (
  req: CreatePlotPointRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { title, content, order } = req.body;
  if (!title || !content)
    return res.status(400).json({ error: "Required fields not sent" });

  const { bookId } = req.params;

  const plotPoint = await PlotPoint.create({
    title,
    content,
    order,
    book: bookId,
  });
  if (!plotPoint)
    return res.status(500).json({
      error:
        "An  error ocurred when inserting the plot point into the database",
    });

  return res
    .status(200)
    .location(`books/${bookId}/plotpoints/${plotPoint._id}`)
    .json(plotPoint);
};

interface UpdateRequest extends IdRequest {
  body: Partial<IPlotPointInfo>;
}

export const updatePlotPoint = async (
  req: UpdateRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { id, bookId } = req.params;
  if (!id)
    return res.status(400).json({ error: "Plot point id was not provided" });

  const { title, content, order } = req.body;
  if (!title && !content && !order)
    return res
      .status(400)
      .json({ error: "Not a single change was sent to make" });

  // Check updates to be made
  const updates: Partial<IPlotPointInfo> = {};
  Object.entries(req.body).forEach(([key, value]) => {
    if (value != undefined) (updates as any)[key] = value;
  });

  const plotPoint = await PlotPoint.findByIdAndUpdate(id);
  if (!plotPoint)
    return res
      .status(500)
      .json({ error: "An error ocurred whtn trying to update the plot point" });

  return res
    .status(200)
    .location(`books/${bookId}/plotpoints/${plotPoint._id}`)
    .json(plotPoint);
};

export const deletePlotPoint = async (
  req: IdRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { id } = req.params;
  if (!id)
    return res.status(400).json({ error: "Plot point id was not provided" });

  const plotPoint = await PlotPoint.findByIdAndDelete(id);
  if (!plotPoint)
    return res.status(404).json({ error: "Plot point not found" });

  return res.status(200).json(plotPoint);
};
