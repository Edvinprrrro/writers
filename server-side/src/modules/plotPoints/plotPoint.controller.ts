import { Response, NextFunction, Request } from "express";
import PlotPoint from "./plotPoint.model.js";
import { CreatePlotPointDto, UpdatePlotPointDto } from "./plotPoint.dto.js";

export const getPlotPoints = async (
  req: Request<{ bookId: string }, any, any>,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { bookId } = req.params;

  const plotPoints = await PlotPoint.find({ book: bookId }).sort({ order: 1 });
  return res.status(200).json(plotPoints);
};

export const getPlotPoint = async (
  req: Request<{ bookId: string; plotPointId: string }, any, any>,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { plotPointId } = req.params;
  if (!plotPointId)
    return res.status(400).json({ error: "Plot point id was not provided" });

  const plotPoint = await PlotPoint.findById(plotPointId);
  if (!plotPoint)
    return res.status(404).json({ error: "Plot point not found" });

  return res.status(200).json(plotPoint);
};

export const createPlotPoint = async (
  req: Request<{ bookId: string }, any, CreatePlotPointDto>,
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

export const updatePlotPoint = async (
  req: Request<
    { bookId: string; plotPointId: string },
    any,
    UpdatePlotPointDto
  >,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { plotPointId, bookId } = req.params;
  if (!plotPointId)
    return res.status(400).json({ error: "Plot point id was not provided" });

  const { title, content, order } = req.body;
  if (!title && !content && !order)
    return res
      .status(400)
      .json({ error: "Not a single change was sent to make" });

  // Check updates to be made
  const updates: UpdatePlotPointDto = {};
  Object.entries(req.body).forEach(([key, value]) => {
    if (value != undefined) (updates as any)[key] = value;
  });

  const plotPoint = await PlotPoint.findByIdAndUpdate(plotPointId);
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
  req: Request<{ plotPointId: string }, any, any>,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { plotPointId } = req.params;
  if (!plotPointId)
    return res.status(400).json({ error: "Plot point id was not provided" });

  const plotPoint = await PlotPoint.findByIdAndDelete(plotPointId);
  if (!plotPoint)
    return res.status(404).json({ error: "Plot point not found" });

  return res.status(200).json(plotPoint);
};
