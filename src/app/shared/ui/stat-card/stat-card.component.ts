import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { AddDiceRollItem, DiceRollerService } from 'src/app/dice-roller/data-access/dice-roller.service';

type ColorKey = 'red' | 'green' | 'orange' | 'blue' | 'yellow' | 'purple';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
    <div
      class="p-2 rounded-2xl bg-gray-900 flex gap-2"
      [ngClass]="{'hover:bg-gray-800 cursor-pointer': isRollable()}"
      (click)="roll(value())"
    >
      @if(svg(); as svg) {
        <div class="size-20 rounded-xl" [ngClass]="colorMap[color()]">
          <img class="w-full" [src]="svg"/>
        </div>
      }
      <div class="flex flex-col">
        <h4 class="font-bold">{{title()}}</h4>
        <p class="text-5xl font-bold text-center">{{value()}}</p>
      </div>
    </div>
  `,
  styles: [],
})
export class StatCardComponent {
  creature = input<string>();
  title = input('');
  isRollable = input(false);
  value = input<string | number>('');
  color = input<ColorKey>('red');
  svg = input<string>();

  colorMap: Record<ColorKey, string> = {
    red: 'bg-red-500',
    green: 'bg-green-500',
    orange: 'bg-orange-500',
    blue: 'bg-blue-500',
    yellow: 'bg-yellow-500',
    purple: 'bg-purple-500',
  };

  constructor(
    private readonly diceRollerService: DiceRollerService,
  ) {}

  roll(value: string | number) {
    if(!this.isRollable()) return;
    if(typeof value === 'number') return;
    const addDiceRollItem: AddDiceRollItem = {
      name: this.creature() ?? '',
      rollName: this.title(),
      diceRoll: [
        {
          roll: 'd20'+value,
          type: null,
        }
      ],
    }
    this.diceRollerService.roll$.next(addDiceRollItem);
  }
}
