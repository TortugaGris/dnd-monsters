import { Component, input } from '@angular/core';
import { Monster } from '../../interfaces/monster.interface';
import { StatCardComponent } from 'src/app/shared/ui/stat-card/stat-card.component';

@Component({
  selector: 'app-monster-speed',
  standalone: true,
  imports: [
    StatCardComponent,
  ],
  template: `
    @if (speed(); as speed) {
      <h2 class="text-2xl font-bold my-4">Speed</h2>
      <div class="flex flex-wrap gap-4">
        @if(speed.walk) {
          <app-stat-card
            title="Walk"
            [value]="speed.walk"
            color="green"
            svg="assets/icons/barefoot.svg"
          ></app-stat-card>
        }
        @if(speed.burrow) {
          <app-stat-card
            title="Burrow"
            [value]="speed.burrow"
            color="green"
            svg="assets/icons/spade.svg"
          ></app-stat-card>
        }
        @if(speed.climb) {
          <app-stat-card
            title="Climb"
            [value]="speed.climb"
            color="green"
            svg="assets/icons/mountain-climbing.svg"
          ></app-stat-card>
        }
        @if(speed.fly) {
          <app-stat-card
            title="Fly"
            [value]="speed.fly"
            color="green"
            svg="assets/icons/fluffy-wing.svg"
          ></app-stat-card>
        }
        @if(speed.swim) {
          <app-stat-card
            title="Swim"
            [value]="speed.swim"
            color="green"
            svg="assets/icons/double-fish.svg"
          ></app-stat-card>
        }
      </div>
    }
  `,
  styles: [],
})
export class MonsterSpeedComponent {
  speed = input<Monster['speed']>()
}
