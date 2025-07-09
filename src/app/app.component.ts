import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ItemComponent } from './item/item.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ItemComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angumyk';
  items = [
    { id: 1, name: 'Ovčí mléko pro děti Omlík', price: 55.55 },
    { id: 2, name: 'Item 2', price: 20 },
    { id: 3, name: 'Item 3', price: 30 }
  ];
}
