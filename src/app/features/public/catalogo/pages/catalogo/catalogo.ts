import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../../../core/services/api.service';
import { Cart } from '../../services/cart';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '../../../../../core/auth/services/auth';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './catalogo.html',
  styleUrl: './catalogo.scss',
})
export class Catalogo implements OnInit {

  productos$!: Observable<any[]>;
  categorias$!: Observable<any[]>;


  constructor(
    private api: ApiService, 
    private cart: Cart, 
    private authService: Auth,
    private route: Router
  ) { }

  // BehaviorSubjects para filtros reactivos
  private searchSubject = new BehaviorSubject<string>('');
  private categoriaSubject = new BehaviorSubject<number | null>(null);
  private precioMinSubject = new BehaviorSubject<number | null>(null);
  private precioMaxSubject = new BehaviorSubject<number | null>(null);

  // Exponer valores actuales para el template
  search = '';
  categoria: number | null = null;
  precioMin: number | null = null;
  precioMax: number | null = null;

  cartCount = 0;

  // Observable final de productos filtrados
  productosFiltrados$ = combineLatest([
    this.productos$,
    this.searchSubject,
    this.categoriaSubject,
    this.precioMinSubject,
    this.precioMaxSubject
  ]).pipe(
    map(([productos, search, categoria, precioMin, precioMax]) => {
      const texto = search.toLowerCase();

      return productos.filter(p =>
        p.nombre.toLowerCase().includes(texto) &&
        (categoria ? p.categoriaId === categoria : true) &&
        (precioMin ? p.precioVenta >= precioMin : true) &&
        (precioMax ? p.precioVenta <= precioMax : true)
      );
    })
  );



  ngOnInit() {
    this.productos$ = this.api.getProductos();
    this.categorias$ = this.api.getCategorias();

    this.productosFiltrados$ = combineLatest([
      this.productos$,
      this.searchSubject,
      this.categoriaSubject,
      this.precioMinSubject,
      this.precioMaxSubject
    ]).pipe(
      map(([productos, search, categoria, precioMin, precioMax]) => {
        const texto = search.toLowerCase();

        return productos.filter(p =>
          p.nombre.toLowerCase().includes(texto) &&
          (categoria ? p.categoriaId === categoria : true) &&
          (precioMin ? p.precioVenta >= precioMin : true) &&
          (precioMax ? p.precioVenta <= precioMax : true)
        );
      })
    );

    this.cartCount = this.cart.getCart().length;
  }

  get isLogged(): boolean {
    return this.authService.isAuthenticated();
  }

  // Actualizar filtros
  actualizarBusqueda(texto: string) {
    this.search = texto;
    this.searchSubject.next(texto);
  }

  seleccionarCategoria(id: number | null) {
    this.categoria = id;
    this.categoriaSubject.next(id);
  }

  actualizarPrecioMin(valor: number | null) {
    this.precioMin = valor;
    this.precioMinSubject.next(valor);
  }

  actualizarPrecioMax(valor: number | null) {
    this.precioMax = valor;
    this.precioMaxSubject.next(valor);
  }

  agregar(p: any) {
    this.cart.add(p);
    this.cartCount = this.cart.getCart().length;
  }

  mostrarAlertaLogin() {
    alert('Debes iniciar sesión para añadir productos al carrito.');
    // redirigir automáticamente:
    this.route.navigate(['/registro-publico']);
  }
}
