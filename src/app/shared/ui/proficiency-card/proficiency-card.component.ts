import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';

type ColorKey = 'red' | 'green' | 'orange' | 'blue' | 'yellow' | 'purple';

@Component({
  selector: 'app-proficiency-card',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
    <div class="w-full bg-gray-900 my-4 p-4 rounded-2xl">
      <div class="flex gap-2">
        @if(svg(); as svg) {
          <div class="size-8 rounded-lg" [ngClass]="colorMap[color()]">
            <img class="w-full" [src]="svg"/>
          </div>
        }
        <h3 class="text-xl font-bold mb-2">{{title()}}</h3>
      </div>
      <p>{{desc()}}</p>
    </div>
  `,
  styles: [],
})
export class ProficiencyCardComponent {
  title = input<string>('');
  desc = input<string>('');
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
