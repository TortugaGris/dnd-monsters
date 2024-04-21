import { Component, OnInit, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MonsterService } from '../monster/data-access/monster.service';
import { CommonModule, JsonPipe } from '@angular/common';
import { MonsterComponent } from '../monster/monster.component';
import { DiceRollerService } from '../dice-roller/data-access/dice-roller.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-monster-view',
  standalone: true,
  imports: [
    CommonModule,
    JsonPipe,
    MonsterComponent,
  ],
  template: `
    @if(monsterItem$ | async; as monsterItem) {
      <div class="px-4 pb-4">
        @if(monsterItem(); as monItem) {
          <app-monster [monster]="monItem"></app-monster>
        }
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
export class MonsterViewComponent {
  monsterItem$ = this.route.paramMap.pipe(
    map((param)=> {
      const index = param.get('index');
      if(index == null) return null;
      this.monsterService.loadItem$.next('/api/monsters/'+index);
      return computed(() => {
        const monsters = this.monsterService.monsters();
        return monsters.find((monster) => monster.index === index) ?? null;
      });
    })
  );

  constructor(
    private readonly monsterService: MonsterService,
    public readonly diceRollerService: DiceRollerService,
    private readonly route: ActivatedRoute,
  ) {
  }
}
