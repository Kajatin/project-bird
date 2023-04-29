import HttpError from "@wasp/core/HttpError.js";
import type { Tank, Game, User } from "@wasp/entities";

export async function getTank(args: any, context: any): Promise<Tank> {
  if (!context.user) {
    throw new HttpError(401, "You must be logged in to add a tank.");
  }

  return await context.entities.Tank.findUnique({
    where: { userId: context.user.id },
  });
}

export async function getGame(args: any, context: any): Promise<Game | null> {
  if (!context.user) {
    throw new HttpError(401, "You must be logged in to add a tank.");
  }

  if (!context.user.gameId) {
    return Promise.resolve(null);
  }

  return await context.entities.Game.findUnique({
    where: { id: context.user.gameId },
  });
}

export async function getUsersForGame(
  args: any,
  context: any
): Promise<User[] | null> {
  if (!context.user) {
    throw new HttpError(401, "You must be logged in to add a tank.");
  }

  if (!context.user.gameId) {
    return Promise.resolve(null);
  }

  // Get users for the game using gameId and then also get the tank color for each user.

  return await context.entities.User.findMany({
    where: { gameId: context.user.gameId },
    select: {
      id: true,
      username: true,
      tank: { select: { color: true } },
    },
  });
}
