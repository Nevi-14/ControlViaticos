import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {

  constructor(
public modalCtrl: ModalController

  ) { }

  ngOnInit() {
  }
  cerrarModal(){

this.modalCtrl.dismiss();
  }
}
