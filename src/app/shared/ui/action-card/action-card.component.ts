import { Component, input } from '@angular/core';
import { DiceTwentyFacesTwentyComponent } from '../svg/dice-twenty-faces-twenty/dice-twenty-faces-twenty.component';
import { DC, Damage } from 'src/app/home/interfaces/monster.interface';

@Component({
  selector: 'app-action-card',
  standalone: true,
  imports: [
    DiceTwentyFacesTwentyComponent,
  ],
  template: `
    <div class="w-full bg-gray-900 my-4 p-4 rounded-2xl">
      <div class="flex justify-between">
        <h3 class="w-full text-xl font-bold mb-2">{{name()}}</h3>
        @if({attackBonus: attackBonus(), dc: dc(), dmg: damage()}; as vm) {
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
        }
      </div>
      <p>{{desc()}}</p>
    </div>
  `,
  styles: [],
})
export class ActionCardComponent {
  name = input<string>();
  desc = input<string>();
  attackBonus = input<number>();
  damage = input<Damage[]>();
  dc = input<DC>();

  valToString(val: number): string {
    return val >=0 ? '+'+val : val.toString();
  }
}
