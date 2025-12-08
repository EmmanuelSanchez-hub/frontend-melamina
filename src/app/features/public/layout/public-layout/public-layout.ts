import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { Footer } from '../../components/footer/footer';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-public-layout',
  imports: [CommonModule, Header, Footer, RouterOutlet],
  templateUrl: './public-layout.html',
  styleUrl: './public-layout.scss',
})
export class PublicLayout {

}
