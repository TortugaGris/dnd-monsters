import { Component, computed, input } from '@angular/core';
import { Monster } from '../home/interfaces/monster.interface';
import {API_URL} from '../home/data-access/monster.service';
import { TitleCasePipe } from '@angular/common';
import { MonsterHealthComponent } from './ui/monster-health/monster-health.component';

@Component({
  selector: 'app-monster',
  standalone: true,
  imports: [
    TitleCasePipe,
    MonsterHealthComponent,
  ],
  template: `
    @if(monster(); as monster) {
      <h1 class="text-5xl mt-8 mb-1 font-bold">{{monster.name}}</h1>
      <p class="mb-4">
        {{monster.size | titlecase}} {{monster.type | titlecase}}@if(monster.subtype){ ({{monster.subtype | titlecase}})}, {{monster.alignment | titlecase}}
      </p>
      <div class="gap-4 flex">
        <div class="flex-1">
          <app-monster-health
            [armorClass]="monster.armor_class"
            [hitPointsRoll]="monster.hit_points_roll"
            [hitPoints]="monster.hit_points"
          />
        </div>
        <div class="flex-1">
        </div>
      </div>
    }
  `,
  styles: [],
})
export class MonsterComponent {
  monster = input.required<Monster>();
}
