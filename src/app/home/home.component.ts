import { Component, computed } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MonsterService } from './data-access/monster.service';
import { JsonPipe } from '@angular/common';
import { MonsterComponent } from '../monster/monster.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterModule,
    JsonPipe,
    MonsterComponent,
  ],
  template: `
    <div class="w-full h-screen flex">
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
    </div>
  `,
  styles: [],
})
export class HomeComponent {
  monsters = this.monsterService.monsters;
  monsterList = this.monsterService.monsterList;
  isLoaded = this.monsterService.isLoaded;

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
