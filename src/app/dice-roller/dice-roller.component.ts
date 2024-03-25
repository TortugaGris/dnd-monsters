import { CommonModule } from '@angular/common';
import { Component, model } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dice-roller',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
  ],
  template: `
    <div class="h-screen bg-gray-900 flex flex-col transition-all ease-in border-l border-gray-800" [ngClass]="{'w-[480px]': isOpen(), 'w-0': !isOpen()}">
      @if(isOpen()){
        <div class="w-full">
          <button class="border-2 py-1 px-2 border-gray-800 rounded m-2 text-gray-800" (click)="toggleOpen()">
            <fa-icon [icon]="icons.arrow"></fa-icon>
          </button>
        </div>
        <div></div>
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

  toggleOpen() {
    this.isOpen.update((val) => !val);
  }
}
