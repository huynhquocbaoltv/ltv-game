export const ACTIONS = {
  RUN: "RUN",
  SHOOT: "SHOOT",
  READY: "READY",
};

export interface Player {
  id: string;
  name: string;
  location: string;
}
