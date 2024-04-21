import { Component, computed, input } from '@angular/core';
import { Monster } from '../../interfaces/monster.interface';
import { ProficiencyCardComponent } from 'src/app/shared/ui/proficiency-card/proficiency-card.component';

@Component({
  selector: 'app-monster-proficiencies',
  standalone: true,
  imports: [
    ProficiencyCardComponent,
  ],
  template: `
    <h2 class="text-2xl font-bold my-4">Proficiencies</h2>
    @if(damageImmunitiesDesc(); as damageImmunitiesDesc) {
      <app-proficiency-card
        title="Damage Immunities"
        [desc]="damageImmunitiesDesc"
        color="orange"
        svg="assets/icons/sword-break.svg"
      ></app-proficiency-card>
    }
    @if(damageResistancesDesc(); as damageResistancesDesc) {
      <app-proficiency-card
        title="Damage Resistances"
        [desc]="damageResistancesDesc"
        color="orange"
        svg="assets/icons/sword-break.svg"
      ></app-proficiency-card>
    }
    @if(damageVulnerabilitiesDesc(); as damageVulnerabilitiesDesc) {
      <app-proficiency-card
        title="Damage Vulnerabilities"
        [desc]="damageVulnerabilitiesDesc"
        color="orange"
        svg="assets/icons/sword-break.svg"
      ></app-proficiency-card>
    }
    @if(conditionImmunitiesDesc(); as conditionImmunitiesDesc) {
      <app-proficiency-card
        title="Condition Immunities"
        [desc]="conditionImmunitiesDesc"
        color="orange"
        svg="assets/icons/gas-mask.svg"
      ></app-proficiency-card>
    }
    @if(sensesDesc(); as sensesDesc) {
      <app-proficiency-card
        title="Senses"
        [desc]="sensesDesc"
        color="yellow"
        svg="assets/icons/awareness.svg"
      ></app-proficiency-card>
    }
    @if(languagesDesc(); as languages) {
      <app-proficiency-card
        title="Languages"
        [desc]="languages"
        color="blue"
        svg="assets/icons/lips.svg"
      ></app-proficiency-card>
    }
  `,
  styles: [],
})
export class MonsterProficienciesComponent {
  damageImmunities = input<Monster['damage_immunities']>();
  damageImmunitiesDesc = computed(() => {
    const damageImmunities = this.damageImmunities();
    if(damageImmunities === undefined) return undefined;
    return damageImmunities?.map((val) => val.charAt(0).toUpperCase() + val.slice(1)).join(', ');
  });

  damageResistances = input<Monster['damage_resistances']>();
  damageResistancesDesc = computed(() => {
    const damageResistances = this.damageResistances();
    if(damageResistances === undefined) return undefined;
    return damageResistances?.map((val) => val.charAt(0).toUpperCase() + val.slice(1)).join(', ');
  });

  damageVulnerabilities = input<Monster['damage_vulnerabilities']>();
  damageVulnerabilitiesDesc = computed(() => {
    const damageVulnerabilities = this.damageVulnerabilities();
    if(damageVulnerabilities === undefined) return undefined;
    return damageVulnerabilities?.map((val) => val.charAt(0).toUpperCase() + val.slice(1)).join(', ');
  });

  conditionImmunities = input<Monster['condition_immunities']>();
  conditionImmunitiesDesc = computed(() => {
    const conditionImmunities = this.conditionImmunities();
    if(conditionImmunities === undefined) return undefined;
    return conditionImmunities?.map((val) => val.name.charAt(0).toUpperCase() + val.name.slice(1)).join(', ');
  });

  senses = input<Monster['senses']>();
  sensesDesc = computed(() => {
    const senses = this.senses();
    if(senses === undefined) return undefined;
    let sensesDesc = '';
    if(senses.blindsight) sensesDesc += 'Blindsight ' + senses.blindsight + ', ';
    if(senses.darkvision) sensesDesc += 'Darkvision ' + senses.darkvision + ', ';
    if(senses.tremorsense) sensesDesc += 'Tremorsense ' + senses.tremorsense + ', ';
    if(senses.truesight) sensesDesc += 'Truesight ' + senses.truesight + ', ';
    if(senses.passive_perception) sensesDesc += 'Passive Perception ' + senses.passive_perception;
    return sensesDesc;
  });

  languages = input<Monster['languages']>();
  languagesDesc = computed(() => {
    const languages = this.languages();
    if(languages === undefined) return undefined;
    return languages.charAt(0).toUpperCase() + languages.slice(1);
  });
}
