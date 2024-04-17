import { Injectable, computed, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, map } from 'rxjs';
import { v4 } from 'uuid';
import { DiceRollItem } from '../interfaces/dice-roll-item.interface';


export interface DiceRollState {
  diceRollList: DiceRollItem[];
  error: string | null;
}

@Injectable({
  providedIn: 'root'
})
export class DiceRollerService {

  //state
  private state = signal<DiceRollState>({
    diceRollList: [],
    error: null,
  });

  //selectors
  diceRollList = computed(() => this.state().diceRollList);
  error = computed(() => this.state().error);

  //sources
  roll$ = new Subject<string>();

  constructor() {
    //reducers
    this.roll$.pipe(
      takeUntilDestroyed(),
      map((roll) => {
        const diceRollItems: DiceRollItem = {
          uuid: v4(),
          name: 'Player',
          rollName: roll,
          diceRoll: [],
        };
        const diceRolls = roll.split(/[()]+/).filter((e: string) => e);
        for (const dr of diceRolls) {
          const regexp = /[\+\-]\d+|(\d+)?d(\d+)([\+\-]\d+)?/
          const match = regexp.exec(dr);
          if(match === null) continue;
          if(match[2] !== undefined) {
            const numDices = match[1] ? parseInt(match[1]) : 1;
            const sides = parseInt(match[2]);
            const addedNum = match[3] ? parseInt(match[3]) : null;
            let sum = 0;
            for (let i = 0; i < numDices; i++) {
              sum = sum + Math.floor(sides*Math.random()+1);
            }
            if(addedNum !== null) sum = sum + addedNum;
            diceRollItems.diceRoll.push({
                roll: match[0],
                value: sum,
                type: null,
            });
          } else {
            diceRollItems.diceRoll.push({
                roll: 'd20'+match[0],
                value: Math.floor(20*Math.random()+1)+parseInt(match[0]),
                type: null,
            });
          }
        }
        return diceRollItems;
      })
    ).subscribe((diceRollItem) =>
      this.state.update((state) => (
        {
          ...state,
          diceRollList: [diceRollItem, ...state.diceRollList],
        }
      ))
    );
  }
}
