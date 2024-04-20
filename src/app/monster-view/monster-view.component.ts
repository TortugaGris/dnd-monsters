import { Component, OnInit, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MonsterService } from '../monster/data-access/monster.service';
import { JsonPipe } from '@angular/common';
import { MonsterComponent } from '../monster/monster.component';
import { DiceRollerService } from '../dice-roller/data-access/dice-roller.service';

@Component({
  selector: 'app-monster-view',
  standalone: true,
  imports: [
    JsonPipe,
    MonsterComponent,
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
export class MonsterViewComponent implements OnInit {
  monsterItem = computed(() => {
    const index = this.route.snapshot.paramMap.get('index');
    const monsters = this.monsterService.monsters();
    return monsters.find((monster) => monster.index === index);
  });

  constructor(
    private readonly monsterService: MonsterService,
    public readonly diceRollerService: DiceRollerService,
    private readonly route: ActivatedRoute,
  ) {}

  ngOnInit() {
    const index = this.route.snapshot.paramMap.get('index');
    this.monsterService.loadItem$.next('/api/monsters/'+index);
  }
}
