import { Component, computed, input } from '@angular/core';
import { Monster } from '../../interfaces/monster.interface';
import { StatCardComponent } from 'src/app/shared/ui/stat-card/stat-card.component';

@Component({
  selector: 'app-monster-saving-throws',
  standalone: true,
  imports: [
    StatCardComponent,
  ],
  template: `
    <h2 class="text-2xl font-bold my-4">Saving Throws</h2>
    <div class="flex flex-wrap gap-4">
      @if(strength(); as str) {
        <app-stat-card
          [creature]="monsterName()"
          [isRollable]="true"
          title="Strength"
          [value]="str"
          color="red"
          svg="assets/icons/bull.svg"
        />
      }
      @if(dexterity(); as dex) {
        <app-stat-card
          [creature]="monsterName()"
          [isRollable]="true"
          title="Dexterity"
          [value]="dex"
          color="green"
          svg="assets/icons/feline.svg"
        />
      }
      @if(constitution(); as con) {
        <app-stat-card
          [creature]="monsterName()"
          [isRollable]="true"
          title="Constitution"
          [value]="con"
          color="orange"
          svg="assets/icons/bear-head.svg"
        />
      }
      @if(intelligence(); as int) {
        <app-stat-card
          [creature]="monsterName()"
          [isRollable]="true"
          title="Intelligence"
          [value]="int"
          color="blue"
          svg="assets/icons/fox-head.svg"
        />
      }
      @if(wisdom(); as wis) {
        <app-stat-card
          [creature]="monsterName()"
          [isRollable]="true"
          title="Wisdom"
          [value]="wis"
          color="yellow"
          svg="assets/icons/owl.svg"
        />
      }
      @if(charisma(); as char) {
        <app-stat-card
          [creature]="monsterName()"
          [isRollable]="true"
          title="Charisma"
          [value]="char"
          color="purple"
          svg="assets/icons/eagle-head.svg"
        />
      }
    </div>
  `,
  styles: [],
})
export class MonsterSavingThrowsComponent {
  monsterName = input<string>();
  str = input<Monster['strength']>();
  dex = input<Monster['dexterity']>();
  con = input<Monster['constitution']>();
  int = input<Monster['intelligence']>();
  wis = input<Monster['wisdom']>();
  char = input<Monster['charisma']>();
  proficiencies = input<Monster['proficiencies']>();

  strength = computed(() => this.calcModifier(this.proficiencies(), this.str(), 'saving-throw-str'));
  dexterity = computed(() => this.calcModifier(this.proficiencies(), this.dex(), 'saving-throw-dex'));
  constitution = computed(() => this.calcModifier(this.proficiencies(), this.con(), 'saving-throw-con'));
  intelligence = computed(() => this.calcModifier(this.proficiencies(), this.int(), 'saving-throw-int'));
  wisdom = computed(() => this.calcModifier(this.proficiencies(), this.wis(), 'saving-throw-wis'));
  charisma = computed(() => this.calcModifier(this.proficiencies(), this.char(), 'saving-throw-cha'));

  private calcModifier(proficiencies: Monster['proficiencies'], ability: number | undefined, index: string) {
    const prof = proficiencies?.find((prof) => prof.proficiency?.index === index);
    if(prof !== undefined) return prof.value !== undefined ? this.valToString(prof.value) : undefined;
    if(ability === undefined) return undefined;
    return this.valToString(Math.floor((ability-10)/2));
  }

  private valToString(val: number): string {
    return val >=0 ? '+'+val : val.toString();
  }
}
