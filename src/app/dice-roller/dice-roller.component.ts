import { CommonModule } from '@angular/common';
import { Component, model, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { diceRollValidator } from './utils/dice-roller.validator';

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
        <div class="h-full">
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

  toggleOpen() {
    this.isOpen.update((val) => !val);
  }

  roll() {
    this.diceRoll.setValue('');
  }
}
