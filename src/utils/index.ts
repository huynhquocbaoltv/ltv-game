export const ACTIONS = {
  RUN: "RUN",
  SHOOT: "SHOOT",
  READY: "READY",
  WAIT: "WAIT",
};

export interface Player {
  id: string;
  name: string;
  location: string;
}
