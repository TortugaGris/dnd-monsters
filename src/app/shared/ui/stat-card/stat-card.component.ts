import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

type ColorKey = 'red' | 'green' | 'orange' | 'blue' | 'yellow' | 'purple';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
    <div class="p-2 rounded-2xl bg-gray-900 flex gap-2">
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
  title = input('');
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
}
