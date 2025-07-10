import { Component, Input, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel

@Component({
  selector: 'cart-item',
  imports: [FormsModule],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent {
  @Input() item: { id: number; name: string; price: number, discount: number };
  @Output() addToCartEvent = new EventEmitter<{name: string, price: number, notes: string}>();

  constructor() {
    this.item = { id: 0, name: '#nic#', price: 0, discount: 0 };
  }

  quantity: number = 1;

  get totalPrice(): number {
    return this.item ? Math.round(this.item.price*this.quantity*(1-this.item.discount)*100)/100 : 0;
  }

  // @ViewChild('itemDiv', { static: true }) itemDiv!: ElementRef;
  // @ViewChild('addCartButton', { static: true }) addCartButton!: ElementRef;
  @ViewChild('quantityInput', { static: true }) quantityInput!: ElementRef;
  @ViewChild('addInfo', { static: true }) addInfo!: ElementRef;

  addToCart() {
    // change div style background color to green
    
    // this.itemDiv.nativeElement.setAttribute('style', 'background-color: #f0f0f0;'); 
    // this.addCartButton.nativeElement.setAttribute('style', 'background-color: #f0f0f0;');

    this.addToCartEvent.emit({
      name: this.item.name,
      price: this.totalPrice,
      notes: this.addInfo.nativeElement.value
    });
    
    this.addInfo.nativeElement.value = "";
    this.quantityInput.nativeElement.value = 1; // reset quantity input to 1
    this.quantity = 1; // reset quantity to 1
    //console.log(`Přidáno do košíku: ${this.item.name}, množství: ${this.quantity}, cena: ${this.totalPrice} Kč, poznámka: ${this.addInfo.nativeElement.value}`);
    console.log(`Přidáno do košíku: ${this.item.name}, množství: ${this.quantity}, cena: ${this.totalPrice} Kč, poznámka: ${this.addInfo.nativeElement.value}`);
  }
}
