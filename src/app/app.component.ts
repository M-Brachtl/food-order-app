import { Component, ElementRef, viewChild, ViewChild } from '@angular/core';
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
  /*cartItems: { name: string; price: number, notes: string }[] = [
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
  ];*/
  cartItems: { name: string; price: number; notes: string }[] = [];
  getCartTotal(addCosts: number = 0): string {
    const total = this.cartItems.reduce((sum, item) => sum + item.price, 0) + addCosts;
    return total.toLocaleString('cs-CZ', { minimumFractionDigits: 2 });
  }
  addToCart(item: { name: string; price: number; notes: string }) {
    this.cartItems.push(item);
    //console.log(`Přidáno do košíku: ${item.name}, cena: ${item.price} Kč, poznámka: ${item.notes}`);
  }

  @ViewChild('primaryMain', { static: true }) primaryMain!: ElementRef;
  @ViewChild('continueMain', { static: true }) continueMain!: ElementRef;

  switchMains() {
    if (this.primaryMain.nativeElement.style.display !== 'none') {
      this.primaryMain.nativeElement.style.display = 'none';
      this.continueMain.nativeElement.style.display = 'block';
    } else {
      this.primaryMain.nativeElement.style.display = 'block';
      this.continueMain.nativeElement.style.display = 'none';
    }
  }

  ngOnInit() { // for testing purposes
    //this.switchMains();
  }

  daysTillGet: number = 3;
  get computedDate(): string {
    if (this.daysTillGet < 1) {
      this.daysTillGet = 1; // Ensure at least 1 day
    } else if (this.daysTillGet > 6) this.daysTillGet = 6; // Ensure at most 6 days
    const date = new Date();
    date.setDate(date.getDate() + this.daysTillGet);
    return date.toLocaleDateString('cs-CZ', { year: 'numeric', month: '2-digit', day: '2-digit' });
  }

  dopravaCheck: boolean = false;
  mykoCard: boolean = false;

  get dopravaCost(): number {
    if (this.dopravaCheck && !this.mykoCard) {
      return 100;
    } else {
      return 0;
    }
  }

  get dateCost(): number {
    const ONEDAYCOST = 25;
    if (this.mykoCard || parseInt(this.getCartTotal()) < 200) {
      return 0; // No cost if Myko card is used
    }
    return -(this.daysTillGet-3) * ONEDAYCOST; // 3 days is base, no cost
  }

  submitOrder() {
    const total = parseFloat(this.getCartTotal()) + this.dopravaCost + this.dateCost + this.mykoDiscount;
    alert(`Objednávka odeslána! Celková cena: ${total.toLocaleString('cs-CZ', { minimumFractionDigits: 2 })} Kč`);
    // Here you can add logic to send the order to a server or process it further
  }

  get mykoDiscount(): number {
    if (this.mykoCard && parseInt(this.getCartTotal()) >= 200) {
      return 20; // Discount for Myko card
    } else {
      return 0;
    }
  }
}
