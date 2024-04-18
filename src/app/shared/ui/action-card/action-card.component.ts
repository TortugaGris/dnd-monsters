import { Component, input } from '@angular/core';
import { DiceTwentyFacesTwentyComponent } from '../svg/dice-twenty-faces-twenty/dice-twenty-faces-twenty.component';
import { DC, Damage } from 'src/app/home/interfaces/monster.interface';
import { CommonModule } from '@angular/common';
import { AddDiceRollItem, DiceRollerService } from 'src/app/dice-roller/data-access/dice-roller.service';

@Component({
  selector: 'app-action-card',
  standalone: true,
  imports: [
    CommonModule,
    DiceTwentyFacesTwentyComponent,
  ],
  template: `
    @if({attackBonus: attackBonus(), dc: dc(), dmg: damage()}; as vm) {
      <div
        class="w-full bg-gray-900 my-4 p-4 rounded-2xl"
        [ngClass]="{'hover:bg-gray-800 cursor-pointer': vm.attackBonus || vm.dmg}"
        (click)="roll(vm.attackBonus, vm.dmg)"
      >
        <div class="flex justify-between">
          <h3 class="w-full text-xl font-bold mb-2">{{name()}}</h3>
            @if(vm.dc || vm.attackBonus || vm.dmg) {
              <div class="flex items-center gap-1 text-gray-600 select-none">
                <app-dice-twenty-faces-twenty/>
                @if(vm.attackBonus){
                  <p>{{valToString(vm.attackBonus)}}</p>
                }
                @if(vm.dc){
                  <p>{{vm.dc.dc_value}}</p>
                  <p>{{vm.dc.dc_type?.name}}</p>
                }
                @for(damage of vm.dmg; track damage.damage_type.index) {
                  <p>({{damage.damage_dice}})</p>
                }
              </div>
            }
        </div>
        <p>{{desc()}}</p>
      </div>
    }
  `,
  styles: [],
})
export class ActionCardComponent {
  creature = input<string>();
  name = input<string>();
  desc = input<string>();
  attackBonus = input<number>();
  damage = input<Damage[]>();
  dc = input<DC>();

  constructor(
    private readonly diceRollerService: DiceRollerService,
  ) {}

  valToString(val: number): string {
    return val >=0 ? '+'+val : val.toString();
  }

  roll(attackBonus: number | undefined, dmg: Damage[] | undefined) {
    if(attackBonus === undefined && dmg === undefined) return;
    const addDiceRollItem: AddDiceRollItem = {
      name: this.creature() ?? '',
      rollName: this.name() ?? '',
      diceRoll: [],
    }

    if (attackBonus !== undefined) {
      const addedNum = attackBonus > 0 ? '+'+attackBonus.toString() : (attackBonus < 0 ? attackBonus.toString() : '');
      addDiceRollItem.diceRoll.push({
        roll: 'd20'+addedNum,
        type: 'To hit',
      });
    }

    if(dmg !== undefined) {
      dmg.forEach((d) => {
        addDiceRollItem.diceRoll.push({
          roll: d.damage_dice,
          type: d.damage_type.name,
        });
      })
    }
    this.diceRollerService.roll$.next(addDiceRollItem);
  }
}
