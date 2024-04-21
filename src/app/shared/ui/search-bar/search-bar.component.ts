import { CommonModule } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { search } from 'fast-fuzzy';
import { map } from 'rxjs';
import { APIReference } from 'src/app/monster/interfaces/monster.interface';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  template: `
    <div class="p-2 border-b border-gray-800 bg-gray-900">
      <div class="w-full flex justify-center">
        <div class="relative">
          <input
            class="bg-gray-800 w-[400px] rounded-l-2xl px-4 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
            type="text"
            placeholder="Search"
            [formControl]="search"
            (keydown.enter)="fuzzySearch()"
          />
          <button
            class="bg-gray-700 rounded-r-2xl px-4 py-1 text-gray-500"
            (click)="fuzzySearch()"
          >
            <fa-icon [icon]="icons.search"></fa-icon>
          </button>
          @if(results$ | async; as results) {
            <div
              class="absolute top-10 w-full p-2 bg-gray-800 rounded-lg text-gray-400"
              [ngClass]="{'hidden': results.length === 0}"
            >
              @for(item of results; track item.name) {
                <p
                  class="hover:bg-gray-700 p-2 rounded cursor-pointer block"
                  (click)="redirect(item.index)"
                >
                  {{item.name}}
                </p>
              }
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class SearchBarComponent {
  icons = {
    search: faMagnifyingGlass,
  }
  search = new FormControl('');
  items= input<APIReference[]>([]);
  results$ = this.search.valueChanges.pipe(
    map((s) => {
      if(s === null) return [] as APIReference[];
      return search(s, this.items(), {keySelector: (obj) => obj.name}).slice(0,10);
    })
  )

  redirect(index: string) {
    this.search.setValue('');
    this.router.navigate(['/monster', index]);
  }

  fuzzySearch() {
    const s = this.search.value;
    if(s === null) return;
    const index = search(s, this.items(), {keySelector: (obj) => obj.name})[0].index;
    this.search.reset();
    this.router.navigate(['/monster', index]);
  }

  constructor(
    private readonly router: Router,
  ) {}
}
