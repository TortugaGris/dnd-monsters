import { CommonModule } from '@angular/common';
import { Component, model, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { diceRollValidator } from './utils/dice-roller.validator';
import { DiceRollerService, AddDiceRollItem, AddDiceRoll } from './data-access/dice-roller.service';

@Component({
  selector: 'app-dice-roller',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
  ],
  template: `
    <div class="h-screen bg-gray-900 flex flex-col transition-all ease-in border-l border-gray-800" [ngClass]="{'w-[480px]': isOpen(), 'w-0': !isOpen()}">
      @if(isOpen()){
        <div class="w-full p-2 border-b border-gray-800">
          <button class="border-2 py-1 px-2 border-gray-800 rounded text-gray-800" (click)="toggleOpen()">
            <fa-icon [icon]="icons.arrow"></fa-icon>
          </button>
        </div>
        <div class="h-full overflow-y-scroll p-4 flex flex-col-reverse gap-4">
          @for(diceRoll of diceRollerService.diceRollList(); track diceRoll.uuid) {
            <div class="bg-gray-800 p-4 rounded-lg">
              <div class="text-gray-500">{{diceRoll.name}}</div>
              <div class="font-bold text-center text-lg pb-2 border-b-gray-700 border-b">{{diceRoll.rollName}}</div>
              <div class="flex flex-wrap mt-4 justify-center gap-8">
                @for(dr of diceRoll.diceRoll; track $index) {
                  <div class="flex flex-col">
                    <div class="text-gray-500 text-center">
                      {{dr.roll}}
                    </div>
                    <div class="text-5xl font-bold text-center">
                      {{dr.value}}
                    </div>
                    <div class="text-gray-400 text-center">
                      {{dr.type}}
                    </div>
                  </div>
                }
              </div>
            </div>
          }
        </div>
        <div class="flex p-4 border-t border-gray-800">
          <input
            class="w-full rounded bg-gray-800 py-1 px-3 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            [ngClass]="{'focus:ring-red-500': diceRoll.invalid && (diceRoll.dirty || diceRoll.touched)}"
            type="text"
            placeholder="Enter Dice Roll: +3(2d12+5)"
            [formControl]="diceRoll"
            (keydown.enter)="roll()"
          />
        </div>
      }
    </div>
  `,
  styles: [],
})
export class DiceRollerComponent {
  isOpen = model(true);
  icons = {
    arrow: faArrowRight,
  }
  diceRoll = new FormControl('', [
    Validators.required,
    diceRollValidator(),
  ]);

  constructor(
    public readonly diceRollerService: DiceRollerService,
  ) {

  }

  toggleOpen() {
    this.isOpen.update((val) => !val);
  }

  roll() {
    if(this.diceRoll.invalid) return;
    const diceRoll = this.diceRoll.value;
    if(diceRoll === null) return;
    const addDiceRollItem: AddDiceRollItem = {
      name: 'Dice Roll',
      rollName: diceRoll,
      diceRoll: diceRoll.split(/[()]+/).filter((e: string) => e).map((e:string): AddDiceRoll => ({roll: e, type: null})),
    }
    this.diceRollerService.roll$.next(addDiceRollItem);
    this.diceRoll.setValue('');
  }
}
