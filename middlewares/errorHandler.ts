// src/middleware/errorHandler.ts
import type { Request, Response, NextFunction, Express } from "express";
import logger from "../utils/logger";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  logger.error(`Error processing request: ${req.method} ${req.url}`, {
    error: err.message,
    stack: err.stack,
  });

  res.status(500).json({ error: "Internal Server Error" });
};

export const applyErrorHandler = (app: Express): void => {
  app.use(errorHandler);
};
