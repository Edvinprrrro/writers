import * as z from "zod";

export const getPlotPointByIdSchema = z.object({
  params: z.object({
    bookId: z.string().min(1),
    plotPointId: z.string().min(1),
  }),
});

export const deletePlotPointSchema = z.object({
  params: z.object({
    bookId: z.string().min(1),
    plotPointId: z.string().min(1),
  }),
});

export const createPlotPointSchema = z.object({
  params: z.object({
    bookId: z.string().min(1),
  }),
  body: z.object({
    title: z.string().min(1),
    content: z.string().min(1),
    order: z.number().optional(),
  }),
});

export const getAllPlotPointsSchema = z.object({
  params: z.object({
    bookId: z.string().min(1),
  }),
});

export const updatePlotPointSchema = z.object({
  params: z.object({
    bookId: z.string().min(1),
    plotPointId: z.string().min(1),
  }),
  body: z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    order: z.number().optional(),
  }),
});
