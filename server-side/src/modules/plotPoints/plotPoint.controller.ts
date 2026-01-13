import { Response, NextFunction, Request } from "express";
import PlotPoint from "./plotPoint.model.js";
import { NotFoundError } from "../../errors/notFoundError.js";
import getUpdates from "../../globalServices/getUpdates.js";
import { HttpError } from "../../errors/httpError.js";

export const getAllPlotPoints = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { bookId } = req.params;
    const plotPoints = await PlotPoint.find({ book: bookId }).sort({
      order: 1,
    });
    if (!plotPoints) throw new NotFoundError();

    return res.status(200).json(plotPoints);
  } catch (error: any) {
    return next(error);
  }
};

export const getPlotPointById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { plotPointId } = req.params;
    const plotPoint = await PlotPoint.findById(plotPointId);
    if (!plotPoint) throw new NotFoundError();

    return res.status(200).json(200);
  } catch (error: any) {
    return next(error);
  }
};

export const createPlotPoint = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const plotPoint = new PlotPoint();
    plotPoint.title = req.body.title;
    plotPoint.content = req.body.content;
    plotPoint.order = req.body.order;
    plotPoint.book = req.params.bookId;
    await plotPoint.save();

    const location = req.originalUrl + plotPoint._id;
    return res.status(201).location(location).json(plotPoint);
  } catch (error: any) {
    return next(error);
  }
};

export const updatePlotPoint = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { plotPointId } = req.params;
    const updates = getUpdates(req.body);
    if (!updates) throw new HttpError(400, "No updates were sent");

    const plotPoint = await PlotPoint.findByIdAndUpdate(plotPointId, updates);
    if (!plotPoint) throw new NotFoundError();

    const location = req.originalUrl + plotPoint._id;
    return res.status(200).location(location).json(200);
  } catch (error: any) {
    return next(error);
  }
};

export const deletePlotPoint = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { plotPointId } = req.params;
    const plotPoint = await PlotPoint.findByIdAndDelete(plotPointId);
    if (!plotPoint) throw new NotFoundError();

    return res.status(200).json(plotPoint);
  } catch (error: any) {
    return next(error);
  }
};
