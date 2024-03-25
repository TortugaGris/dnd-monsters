import { Component, computed } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MonsterService } from './data-access/monster.service';
import { JsonPipe } from '@angular/common';
import { MonsterComponent } from '../monster/monster.component';
import { DiceRollerComponent } from '../dice-roller/dice-roller.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'

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
    <div class="w-full h-screen flex">
      @if(!isOpen){
        <button class="border-2 py-1 px-2 border-gray-800 rounded m-2 text-gray-800 absolute right-0" (click)="isOpen = !isOpen">
          <fa-icon [icon]="icons.arrow"></fa-icon>
        </button>
      }
      <div class="w-full overflow-scroll no-scrollbar">
        <main class="container mx-auto">
          @if(monsterItem(); as monsterItem) {
            <div class="px-4 pb-4">
              <app-monster [monster]="monsterItem"></app-monster>
            </div>
          }
        </main>
        <div class="w-full bg-gray-900 p-8 text-gray-500 text-center">
          Icons created by Lorc, Delapouite & contributors (<a class="underline" href="https://game-icons.net/">game-icons.net</a>)
          licensed under <a class="underline" href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>.
        </div>
      </div>
      <app-dice-roller [(isOpen)]="isOpen"/>
    </div>
  `,
  styles: [],
})
export class HomeComponent {
  monsters = this.monsterService.monsters;
  monsterList = this.monsterService.monsterList;
  isLoaded = this.monsterService.isLoaded;
  isOpen = true;
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
  ) {
  }

}
