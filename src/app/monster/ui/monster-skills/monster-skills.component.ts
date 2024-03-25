import { Component, computed, input } from '@angular/core';
import { Monster } from 'src/app/home/interfaces/monster.interface';
import { StatCardComponent } from 'src/app/shared/ui/stat-card/stat-card.component';

@Component({
  selector: 'app-monster-skills',
  standalone: true,
  imports: [
    StatCardComponent,
  ],
  template: `
    <h2 class="text-2xl font-bold my-4">Skills</h2>
    <div class="flex flex-wrap gap-4">
      @if(acrobatics(); as acrobatics) {
        <app-stat-card
          title="Acrobatics"
          [value]="acrobatics"
          color="green"
          svg="assets/icons/contortionist.svg"
        />
      }
      @if(animalHandiling(); as animalHandiling) {
        <app-stat-card
          title="Animal Handiling"
          [value]="animalHandiling"
          color="yellow"
          svg="assets/icons/cavalry.svg"
        />
      }
      @if(arcana(); as arcana) {
        <app-stat-card
          title="Arcana"
          [value]="arcana"
          color="blue"
          svg="assets/icons/spell-book.svg"
        />
      }
      @if(athletics(); as athletics) {
        <app-stat-card
          title="Athletics"
          [value]="athletics"
          color="red"
          svg="assets/icons/muscle-up.svg"
        />
      }
      @if(deception(); as deception) {
        <app-stat-card
          title="Deception"
          [value]="deception"
          color="purple"
          svg="assets/icons/convince.svg"
        />
      }
      @if(history(); as history) {
        <app-stat-card
          title="History"
          [value]="history"
          color="blue"
          svg="assets/icons/archive-research.svg"
        />
      }
      @if(insight(); as insight) {
        <app-stat-card
          title="Insight"
          [value]="insight"
          color="yellow"
          svg="assets/icons/third-eye.svg"
        />
      }
      @if(intimidation(); as intimidation) {
        <app-stat-card
          title="Intimidation"
          [value]="intimidation"
          color="purple"
          svg="assets/icons/one-eyed.svg"
        />
      }
      @if(investigation(); as investigation) {
        <app-stat-card
          title="Investigation"
          [value]="investigation"
          color="blue"
          svg="assets/icons/magnifying-glass.svg"
        />
      }
      @if(medicine(); as medicine) {
        <app-stat-card
          title="Medicine"
          [value]="medicine"
          color="yellow"
          svg="assets/icons/apothecary.svg"
        />
      }
      @if(nature(); as nature) {
        <app-stat-card
          title="Nature"
          [value]="nature"
          color="blue"
          svg="assets/icons/forest.svg"
        />
      }
      @if(perception(); as perception) {
        <app-stat-card
          title="Perception"
          [value]="perception"
          color="yellow"
          svg="assets/icons/semi-closed-eye.svg"
        />
      }
      @if(performance(); as performance) {
        <app-stat-card
          title="Performance"
          [value]="performance"
          color="purple"
          svg="assets/icons/sing.svg"
        />
      }
      @if(persuasion(); as persuasion) {
        <app-stat-card
          title="Persuasion"
          [value]="persuasion"
          color="purple"
          svg="assets/icons/public-speaker.svg"
        />
      }
      @if(religion(); as religion) {
        <app-stat-card
          title="Religion"
          [value]="religion"
          color="blue"
          svg="assets/icons/ankh.svg"
        />
      }
      @if(sleightOfHand(); as sleightOfHand) {
        <app-stat-card
          title="Sleight of Hand"
          [value]="sleightOfHand"
          color="green"
          svg="assets/icons/snatch.svg"
        />
      }
      @if(stealth(); as stealth) {
        <app-stat-card
          title="Stealth"
          [value]="stealth"
          color="green"
          svg="assets/icons/cloak-dagger.svg"
        />
      }
      @if(survival(); as survival) {
        <app-stat-card
          title="survival"
          [value]="survival"
          color="yellow"
          svg="assets/icons/deer-track.svg"
        />
      }
    </div>
  `,
  styles: [],
})
export class MonsterSkillsComponent {
  str = input<Monster['strength']>();
  dex = input<Monster['dexterity']>();
  con = input<Monster['constitution']>();
  int = input<Monster['intelligence']>();
  wis = input<Monster['wisdom']>();
  char = input<Monster['charisma']>();
  proficiencies = input<Monster['proficiencies']>();

  acrobatics = computed(() => this.calcModifier(this.proficiencies(), this.dex(), 'skill-acrobatics'));
  animalHandiling = computed(() => this.calcModifier(this.proficiencies(), this.wis(), 'skill-animal-handling'));
  arcana = computed(() => this.calcModifier(this.proficiencies(), this.int(), 'skill-arcana'));
  athletics = computed(() => this.calcModifier(this.proficiencies(), this.str(), 'skill-athletics'));
  deception = computed(() => this.calcModifier(this.proficiencies(), this.char(), 'skill-deception'));
  history = computed(() => this.calcModifier(this.proficiencies(), this.int(), 'skill-history'));
  insight = computed(() => this.calcModifier(this.proficiencies(), this.wis(), 'skill-insight'));
  intimidation = computed(() => this.calcModifier(this.proficiencies(), this.char(), 'skill-intimidation'));
  investigation = computed(() => this.calcModifier(this.proficiencies(), this.int(), 'skill-investigation'));
  medicine = computed(() => this.calcModifier(this.proficiencies(), this.wis(), 'skill-medicine'));
  nature = computed(() => this.calcModifier(this.proficiencies(), this.int(), 'skill-nature'));
  perception = computed(() => this.calcModifier(this.proficiencies(), this.wis(), 'skill-perception'));
  performance = computed(() => this.calcModifier(this.proficiencies(), this.char(), 'skill-performance'));
  persuasion = computed(() => this.calcModifier(this.proficiencies(), this.char(), 'skill-persuasion'));
  religion = computed(() => this.calcModifier(this.proficiencies(), this.int(), 'skill-religion'));
  sleightOfHand = computed(() => this.calcModifier(this.proficiencies(), this.dex(), 'skill-sleight-of-hand'));
  stealth = computed(() => this.calcModifier(this.proficiencies(), this.dex(), 'skill-stealth'));
  survival = computed(() => this.calcModifier(this.proficiencies(), this.wis(), 'skill-survival'));

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
