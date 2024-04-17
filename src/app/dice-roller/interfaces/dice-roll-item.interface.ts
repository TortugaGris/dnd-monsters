export interface DiceRoll {
  roll: string;
  value: number;
  type: string | null;
}

export interface DiceRollItem {
  uuid: string;
  name: string;
  rollName: string;
  diceRoll: DiceRoll[];
}
