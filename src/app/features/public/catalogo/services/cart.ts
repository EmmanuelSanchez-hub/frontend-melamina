import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Cart {
  private key = 'cart';
  private items: any[] = [];

  constructor() {
    this.items = JSON.parse(localStorage.getItem(this.key) || '[]');
  }

  getCart() {
    return this.items;
  }

  add(product: any) {
    const exist = this.items.find(i => i.id === product.id);

    if (exist) exist.cantidad++;
    else this.items.push({ ...product, cantidad: 1 });

    this.save();
  }

  updateCantidad(id: number, cantidad: number) {
    const item = this.items.find(i => i.id === id);
    if (item) {
      item.cantidad = cantidad;
      if (item.cantidad <= 0) {
        this.remove(id);
      }
      this.save();
    }
  }

  remove(id: number) {
    this.items = this.items.filter(i => i.id !== id);
    this.save();
  }

  clear() {
    this.items = [];
    this.save();
  }

  getTotal() {
    return this.items.reduce((sum, p) => sum + p.precioVenta * p.cantidad, 0);
  }

  private save() {
    localStorage.setItem(this.key, JSON.stringify(this.items));
  }
}
