import { Component, input } from '@angular/core';
import { Monster } from '../../interfaces/monster.interface';
import { StatCardComponent } from 'src/app/shared/ui/stat-card/stat-card.component';

@Component({
  selector: 'app-monster-health',
  standalone: true,
  imports: [
    StatCardComponent,
  ],
  template: `
    <h2 class="text-2xl font-bold my-4">Health</h2>
    <div class="flex flex-wrap gap-4">
      @for(armorClass of armorClass(); track armorClass.type) {
        <app-stat-card
          [title]="'Armor Class (' + armorClass.type + ')'"
          [value]="armorClass.value"
          color="red"
          svg="assets/icons/lamellar.svg"
        ></app-stat-card>
      }
      <app-stat-card
        [title]="'Hit Points (' + hitPointsRoll() + ')'"
        [value]="hitPoints() ?? ''"
        color="orange"
        svg="assets/icons/hearts.svg"
      ></app-stat-card>
    </div>
  `,
  styles: [],
})
export class MonsterHealthComponent {
  armorClass = input<Monster['armor_class']>([])
  hitPointsRoll = input<Monster['hit_points_roll']>('')
  hitPoints= input<Monster['hit_points']>()
}
