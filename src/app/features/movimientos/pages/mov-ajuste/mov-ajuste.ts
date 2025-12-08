import { Component, OnInit } from '@angular/core';
import { Producto } from '../../../../core/interfaces/interfaces';
import { debounceTime, Observable, switchMap } from 'rxjs';
import { Product } from '../../../products/services/product.service';
import { MovimientosService } from '../../services/movimientos.service';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../../../../core/services/api.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mov-ajuste',
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './mov-ajuste.html',
  styleUrl: './mov-ajuste.scss',
})
export class MovAjuste implements OnInit {
  productos$!: Observable<Producto[]>;

  form = new FormGroup({
    productoId: new FormControl<number>(0, {
      nonNullable: true,
      validators: [Validators.required],
    }),

    cantidad: new FormControl<number>(1, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(1)],
    }),

    tipo: new FormControl<'ENTRADA' | 'SALIDA'>('ENTRADA', {
      nonNullable: true,
      validators: [Validators.required],
    }),

    motivo: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),

    observaciones: new FormControl<string>('', {
      nonNullable: true,
    }),
  });

  buscarProducto = new FormControl('');
  productos: Producto[] = [];

  constructor(
    private productosService: Product,
    private movimientosService: MovimientosService,
    private router: Router,
    public api: ApiService
  ) {}

  ngOnInit(): void {
    this.buscarProducto.valueChanges
      .pipe(
        debounceTime(300),
        switchMap(txt => this.productosService.buscar(txt || ''))
      )
      .subscribe(res => this.productos = res);
  }

  seleccionarProducto(p: Producto) {
    this.form.get('productoId')?.setValue(p.id);
    this.buscarProducto.setValue(`${p.codigo} - ${p.nombre}`, { emitEvent: false });
    this.productos = [];
  }

  guardar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const usuarioId = JSON.parse(localStorage.getItem('user')!).id;

    const payload = {
      usuarioId,
      ...this.form.value
    };

    this.movimientosService.registrarAjuste(payload)
      .subscribe(() => this.router.navigate(['/app/movimientos']));
  }
}
