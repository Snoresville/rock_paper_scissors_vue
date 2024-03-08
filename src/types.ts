export enum Moves {
  None,
  Rock,
  Paper,
  Scissors,
}

export type StatCategory = {
  title: string;
  stats: Record<string, number>;
};
