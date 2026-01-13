import express from "express";
import { authenticateAccessToken } from "../../middleware/authenticateAccessToken";
import { validateRequest } from "../../middleware/validateRequest";
import {
  createPlotPointSchema,
  deletePlotPointSchema,
  getAllPlotPointsSchema,
  getPlotPointByIdSchema,
  updatePlotPointSchema,
} from "./plotPoint.schemas";
import {
  createPlotPoint,
  deletePlotPoint,
  getAllPlotPoints,
  getPlotPointById,
  updatePlotPoint,
} from "./plotPoint.controller";

const router = express.Router({ mergeParams: true });

router.use(authenticateAccessToken);

router.get("/", validateRequest(getAllPlotPointsSchema), getAllPlotPoints);
router.get(
  "/:plotPointId",
  validateRequest(getPlotPointByIdSchema),
  getPlotPointById
);
router.post("/", validateRequest(createPlotPointSchema), createPlotPoint);
router.put(
  "/:plotPointId",
  validateRequest(updatePlotPointSchema),
  updatePlotPoint
);
router.delete(
  "/:plotPointId",
  validateRequest(deletePlotPointSchema),
  deletePlotPoint
);

export default router;
