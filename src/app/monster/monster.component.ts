import { Component, input } from '@angular/core';
import { Monster } from './interfaces/monster.interface';
import { TitleCasePipe } from '@angular/common';
import { MonsterHealthComponent } from './ui/monster-health/monster-health.component';
import { MonsterSpeedComponent } from './ui/monster-speed/monster-speed.component';
import { MonsterSavingThrowsComponent } from './ui/monster-saving-throws/monster-saving-throws.component';
import { MonsterProficienciesComponent } from './ui/monster-proficiencies/monster-proficiencies.component';
import { MonsterSkillsComponent } from './ui/monster-skills/monster-skills.component';
import { ActionCardComponent } from '../shared/ui/action-card/action-card.component';

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
    ActionCardComponent,
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
            [monsterName]="monster.name"
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
            [monsterName]="monster.name"
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
          @if(monster.special_abilities && monster.special_abilities.length > 0) {
            <h2 class="text-2xl font-bold my-4">Special Abilities</h2>
            @for(specialAbility of monster.special_abilities; track specialAbility.name) {
              <app-action-card
                [creature]="monster.name"
                [name]="specialAbility.name"
                [desc]="specialAbility.desc"
                [attackBonus]="specialAbility.attack_bonus"
                [damage]="specialAbility.damage"
                [dc]="specialAbility.dc"
              />
            }
          }
          @if(monster.actions && monster.actions.length > 0) {
            <h2 class="text-2xl font-bold my-4">Actions</h2>
            @for(action of monster.actions; track action.name) {
              <app-action-card
                [creature]="monster.name"
                [name]="action.name"
                [desc]="action.desc"
                [attackBonus]="action.attack_bonus"
                [damage]="action.damage"
                [dc]="action.dc"
              />
            }
          }
          @if(monster.reactions && monster.reactions.length > 0) {
            <h2 class="text-2xl font-bold my-4">Reactions</h2>
            @for(reaction of monster.reactions; track reaction.name) {
              <app-action-card
                [creature]="monster.name"
                [name]="reaction.name"
                [desc]="reaction.desc"
                [attackBonus]="reaction.attack_bonus"
                [damage]="reaction.damage"
                [dc]="reaction.dc"
              />
            }
          }
          @if(monster.legendary_actions && monster.legendary_actions.length > 0) {
            <h2 class="text-2xl font-bold my-4">Legendary Actions</h2>
            @for(action of monster.legendary_actions; track action.name) {
              <app-action-card
                [creature]="monster.name"
                [name]="action.name"
                [desc]="action.desc"
                [attackBonus]="action.attack_bonus"
                [damage]="action.damage"
                [dc]="action.dc"
              />
            }
          }
        </div>
      </div>
    }
  `,
  styles: [],
})
export class MonsterComponent {
  monster = input.required<Monster>();
}
