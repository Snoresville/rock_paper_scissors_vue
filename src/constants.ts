import { StatCategory } from "./types";

export const DEFAULT_STATS_BOARD: Record<string, StatCategory> = {
  movesPlayed: {
    title: "Moves Played",
    stats: {
      Rocks: 0,
      Papers: 0,
      Scissors: 0,
    },
  },
  stats: {
    title: "Stats",
    stats: {
      Wins: 0,
      Draws: 0,
      Losses: 0,
    },
  },
};
