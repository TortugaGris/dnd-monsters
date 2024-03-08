import { Component, OnInit, Signal, computed } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MonsterService } from './data-access/monster.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterModule,
    JsonPipe,
  ],
  template: `
    @if(monsterItem()) {
      <pre>
        {{monsterItem() | json}}
      </pre>
    }
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
