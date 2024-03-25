import { HttpClient } from '@angular/common/http';
import { Injectable, computed, signal } from '@angular/core';
import { NEVER, Subject, switchMap } from 'rxjs';
import { Monster, MonsterList } from '../interfaces/monster.interface';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

export interface MonstersState {
  monsterList: MonsterList | null;
  isLoaded: boolean;
  error: string | null;
}

export const API_URL = 'https://www.dnd5eapi.co';
const MONSTER_LIST_URL = API_URL + '/api/monsters';

@Injectable({
  providedIn: 'root'
})
export class MonsterService {
  //state
  private state = signal<MonstersState>({
    monsterList: null,
    isLoaded: false,
    error: null,
  });


  //selectors
  monsters = signal<Monster[]>([]);
  monsterList = computed(() => this.state().monsterList);
  isLoaded = computed(() => this.state().isLoaded);
  error = computed(() => this.state().error);

  //sources
  loadMonsterList$ = this.http.get<MonsterList>(MONSTER_LIST_URL);
  loadItem$ = new Subject<string>();

  constructor(private readonly http: HttpClient) {
    //reducers
    this.loadMonsterList$.pipe(takeUntilDestroyed()).subscribe({
      next: (monsterList) => this.state.update((state) => ({
        ...state,
        monsterList,
        isLoaded: true,
      })),
      error: (err) => this.state.update((state) => ({...state, error: err})),
    });

    this.loadItem$.pipe(
      takeUntilDestroyed(),
      switchMap((url) => {
        const monsters = this.monsters();
        const monster = monsters.find((monster) => monster.url === url);
        if(monster !== undefined) return NEVER;
        return this.http.get<Monster>(API_URL + url);
      }),
    ).subscribe((monsterData) =>
      this.monsters.update((monsters) => [...monsters, monsterData])
    );
  }
}
