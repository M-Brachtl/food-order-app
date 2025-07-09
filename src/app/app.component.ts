import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ItemComponent } from './item/item.component';
import { FormsModule } from '@angular/forms';

// import items from json file
import itemsData from './items.json';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ItemComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angumyk';
  items = itemsData;
  searchTerm: string = '';
}
