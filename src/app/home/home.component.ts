import { Component, computed } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MonsterService } from '../monster/data-access/monster.service';
import { JsonPipe } from '@angular/common';
import { MonsterComponent } from '../monster/monster.component';
import { DiceRollerComponent } from '../dice-roller/dice-roller.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'
import { DiceRollerService } from '../dice-roller/data-access/dice-roller.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterModule,
    JsonPipe,
    MonsterComponent,
    DiceRollerComponent,
    FontAwesomeModule,
  ],
  template: `
    @if(monsterItem(); as monsterItem) {
      <div class="px-4 pb-4">
        <app-monster [monster]="monsterItem"></app-monster>
        <!--
        <pre class="bg-gray-900 rounded-2xl p-4 my-4">{{monsterItem.special_abilities | json}}</pre>
        <pre class="bg-gray-900 rounded-2xl p-4 my-4">{{monsterItem.actions | json}}</pre>
        <pre class="bg-gray-900 rounded-2xl p-4 my-4">{{monsterItem.reactions | json}}</pre>
        <pre class="bg-gray-900 rounded-2xl p-4 my-4">{{monsterItem.legendary_actions | json}}</pre>
        -->
      </div>
    }
  `,
  styles: [],
})
export class HomeComponent {
  monsters = this.monsterService.monsters;
  monsterList = this.monsterService.monsterList;
  isLoaded = this.monsterService.isLoaded;
  isOpen = this.diceRollerService.isOpen;
  icons = {
    arrow: faArrowLeft,
  }

  url: string | null = null;
  randomUrl = computed(() => {
    if(this.url !== null) return this.url
    const monsterList = this.monsterList();
    if(monsterList === null) return;
    const monster = monsterList.results[Math.floor(Math.random() * monsterList.results.length)];
    this.monsterService.loadItem$.next(monster.url);
    this.url = monster.url
    return monster.url;
  })

  monsterItem = computed(() => {
    const url = this.randomUrl();
    if(url === undefined) return undefined;
    const monsters = this.monsterService.monsters();
    return monsters.find((monster) => monster.url === url);
  });

  constructor(
    private readonly monsterService: MonsterService,
    public readonly diceRollerService: DiceRollerService,
  ) {}
}
