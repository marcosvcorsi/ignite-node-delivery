import { NextFunction, Request, Response } from "express";
import { ServerError } from "../../errors/server";

export const errorHandler = (
  error: Error,
  request: Request,
  response: Response,
  _: NextFunction
) => {
  if (error instanceof ServerError) {
    return response.status(error.statusCode).json({ message: error.message });
  }

  return response.status(500).json({ message: "Internal Server Error" });
};
