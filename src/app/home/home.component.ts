import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterModule,
  ],
  template: `
    <p>
      home works!
    </p>
  `,
  styles: [],
})
export class HomeComponent {

}
