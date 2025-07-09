import { Component, Input } from '@angular/core';

@Component({
  selector: 'bought-item',
  imports: [],
  templateUrl: './bought.component.html',
  styleUrl: './bought.component.css'
})
export class BoughtComponent {
  @Input() item: { name: string; price: number, notes: string };

  constructor() {
    this.item = { name: '#nic#', price: 0, notes: '' };
  }

  get formattedPrice(): string {
    return this.item ? this.item.price.toLocaleString('cs-CZ', { minimumFractionDigits: 2 }) : '0,00';
  }
}
