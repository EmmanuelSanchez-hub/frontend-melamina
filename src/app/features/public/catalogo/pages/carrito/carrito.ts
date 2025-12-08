import { Component, OnInit } from '@angular/core';
import { Cart } from '../../services/cart';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carrito',
  imports: [CommonModule],
  templateUrl: './carrito.html',
  styleUrl: './carrito.scss',
})
export class Carrito implements OnInit {
  items: any[] = [];
  total = 0;

  constructor(private cart: Cart) {}

  ngOnInit() {
    this.items = this.cart.getCart();
    this.total = this.cart.getTotal();
  }

  actualizarCantidad(id: number, event: any) {
    const cantidad = Number(event.target.value);
    this.cart.updateCantidad(id, cantidad);
    this.items = this.cart.getCart();
    this.total = this.cart.getTotal();
  }

  eliminar(id: number) {
    this.cart.remove(id);
    this.items = this.cart.getCart();
    this.total = this.cart.getTotal();
  }

  limpiar() {
    this.cart.clear();
    this.items = [];
    this.total = 0;
  }

}
