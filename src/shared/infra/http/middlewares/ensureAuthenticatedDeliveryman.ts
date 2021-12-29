import { NextFunction, Request, Response } from "express";
import { jwtConfig } from "@/config/jwt";
import { JwtTokenProvider } from "@/shared/infra/providers/jwt";
import { UnauthorizedError } from "@/shared/infra/providers/unauthorized";

type JwtPayload = {
  sub: string;
};

export async function ensureAuthenticatedDeliveryman(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new UnauthorizedError("Token is missing");
  }

  try {
    const [, token] = authHeader.split(" ");

    const jwtTokenProvider = new JwtTokenProvider(jwtConfig.deliverymanSecret);

    const { sub } = (await jwtTokenProvider.validate(token)) as JwtPayload;

    request.deliverymanId = sub;

    return next();
  } catch {
    throw new UnauthorizedError("Invalid token");
  }
}
