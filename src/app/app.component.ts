import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ItemComponent } from './item/item.component';
import { BoughtComponent } from './bought/bought.component';
import { FormsModule } from '@angular/forms';

// import items from json file
import itemsData from './items.json';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ItemComponent, BoughtComponent, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'angumyk';
  items = itemsData;
  searchTerm: string = '';
  cartItems: { name: string; price: number, notes: string }[] = [
    { name: 'Chleba', price: 30, notes: 'Čerstvý chléb z pekárny' },
    { name: 'Mléko', price: 20, notes: 'Plnotučné mléko' },
    { name: 'Máslo', price: 40, notes: 'Máslo z farmy' },
    { name: 'Ovčí mléko pro děti Omlík', price: 50, notes: 'Čerstvé ovčí mléko' },
    { name: 'Jogurt', price: 25, notes: 'Domácí jogurt' },
    { name: 'Sýr', price: 60, notes: 'Sýr z místní farmy' },
    { name: 'Vejce', price: 30, notes: 'Čerstvá vejce od slepic' },
    { name: 'Zelenina', price: 45, notes: 'Čerstvá zelenina z farmy' },
    { name: 'Ovoce', price: 35, notes: 'Sezónní ovoce' },
    { name: 'Maso', price: 150, notes: 'Čerstvé maso z místního řeznictví' },
    { name: 'Ryba', price: 80, notes: 'Čerstvá ryba z rybářství' },
    { name: 'Chléb', price: 25, notes: 'Domácí chléb' },
    { name: 'Koláče', price: 45, notes: 'Domácí koláče' },
    { name: 'Pivo', price: 50, notes: 'Místní pivo z pivovaru' },
    { name: 'Víno', price: 120, notes: 'Víno z místní vinice' }
  ];
  getCartTotal(): string {
    const total = this.cartItems.reduce((sum, item) => sum + item.price, 0);
    return total.toLocaleString('cs-CZ', { minimumFractionDigits: 2 });
  }
  addToCart(item: { name: string; price: number; notes: string }) {
    this.cartItems.push(item);
    //console.log(`Přidáno do košíku: ${item.name}, cena: ${item.price} Kč, poznámka: ${item.notes}`);
  }
}
