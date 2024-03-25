import { Component, computed, input } from '@angular/core';
import { Monster } from '../home/interfaces/monster.interface';
import {API_URL} from '../home/data-access/monster.service';
import { TitleCasePipe } from '@angular/common';
import { MonsterHealthComponent } from './ui/monster-health/monster-health.component';
import { MonsterSpeedComponent } from './ui/monster-speed/monster-speed.component';
import { MonsterSavingThrowsComponent } from './ui/monster-saving-throws/monster-saving-throws.component';
import { MonsterProficienciesComponent } from './ui/monster-proficiencies/monster-proficiencies.component';
import { MonsterSkillsComponent } from './ui/monster-skills/monster-skills.component';

@Component({
  selector: 'app-monster',
  standalone: true,
  imports: [
    TitleCasePipe,
    MonsterHealthComponent,
    MonsterSpeedComponent,
    MonsterSavingThrowsComponent,
    MonsterProficienciesComponent,
    MonsterSkillsComponent,
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
          <app-monster-speed
            [speed]="monster.speed"
          />
          <app-monster-saving-throws
            [str]="monster.strength"
            [dex]="monster.dexterity"
            [con]="monster.constitution"
            [int]="monster.intelligence"
            [wis]="monster.wisdom"
            [char]="monster.charisma"
            [proficiencies]="monster.proficiencies"
          />
          <app-monster-proficiencies
            [damageImmunities]="monster.damage_immunities"
            [damageResistances]="monster.damage_resistances"
            [damageVulnerabilities]="monster.damage_vulnerabilities"
            [conditionImmunities]="monster.condition_immunities"
            [senses]="monster.senses"
            [languages]="monster.languages"
          />
          <app-monster-skills
            [str]="monster.strength"
            [dex]="monster.dexterity"
            [con]="monster.constitution"
            [int]="monster.intelligence"
            [wis]="monster.wisdom"
            [char]="monster.charisma"
            [proficiencies]="monster.proficiencies"
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
