import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {
  image = '../assets/islena.png';
  public appPages = [
    { title: 'Ordenes de Compra', url: '/inicio/gestion-ordernes', icon: 'bag' },
    { title: 'Compras Internacionales', url: '/inicio/compras-internacionales', icon: 'boat' },
   
  ];
  constructor() { }

  ngOnInit() {
  }

}
