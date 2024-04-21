import { Component } from '@angular/core';
import { DiceRollerService } from './dice-roller/data-access/dice-roller.service';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { MonsterService } from './monster/data-access/monster.service';

@Component({
  selector: 'app-root',
  template: `
    <div class="w-full h-screen flex flex-col">
      @if(monsterList(); as monsterList) {
        <app-search-bar [items]="monsterList.results"/>
      }
      <div class="flex h-full min-h-0">
        @if(!isOpen()){
          <button class="border-2 py-1 px-2 border-gray-800 rounded m-2 text-gray-800 absolute right-0" (click)="diceRollerService.setOpen$.next(!isOpen())">
            <fa-icon [icon]="icons.arrow"></fa-icon>
          </button>
        }
        <div class="w-full overflow-scroll no-scrollbar">
          <main class="container mx-auto">
            <router-outlet></router-outlet>
          </main>
          <div class="w-full bg-gray-900 p-8 text-gray-500 text-center">
            Icons created by Lorc, Delapouite & contributors (<a class="underline" href="https://game-icons.net/">game-icons.net</a>)
            licensed under <a class="underline" href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a>.
          </div>
        </div>
        <app-dice-roller/>
      </div>
    </div>
  `,
  styles: [],
})
export class AppComponent {
  isOpen = this.diceRollerService.isOpen;
  icons = {
    arrow: faArrowLeft,
  }
  monsterList = this.monsterService.monsterList;

  constructor(
    public readonly diceRollerService: DiceRollerService,
    private readonly monsterService: MonsterService
  ) {}
}
