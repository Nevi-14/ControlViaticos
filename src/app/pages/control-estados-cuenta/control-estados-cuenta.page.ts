import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { EstadosCuentaService } from 'src/app/services/estados-cuenta.service';
import { EstadoCuentaPage } from '../estado-cuenta/estado-cuenta.page';
import { AlertasService } from '../../services/alertas.service';
import { CorreoService } from '../../services/correo.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { EstadosCuenta } from 'src/app/models/estadosCuenta';
import { DatatableComponent } from '@swimlane/ngx-datatable';

@Component({
  selector: 'app-control-estados-cuenta',
  templateUrl: './control-estados-cuenta.page.html',
  styleUrls: ['./control-estados-cuenta.page.scss'],
})
export class ControlEstadosCuentaPage implements OnInit {
  isOpen: boolean = false;
  file:any = null;
  textoBuscar = "";
  multi:any ='multi';
  url = 'http://mercaderistas.di-apps.co.cr/api/get/estados/cuenta/archivo/?ID='
  @ViewChild(DatatableComponent) table: DatatableComponent;
  public columns: any;
  public rows: any[];
  temp = [];
  constructor(
  public modalCtrl: ModalController,
  public alertasService: AlertasService,
  public estadosCuentaService:EstadosCuentaService ,
  public correoService: CorreoService, 
  public usuariosService: UsuariosService
  ) { }

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos(){

    this.columns = [
      { id: "referencia", label: "Referencia", size: 2},
      { id: "usuario", label: "Usuario", size: 2 },
      { id: "fecha", label: "Fecha", size: 2 },
      { id: "monto", label: "Monto", size: 2 },
      { id: "archivo", label: "Archivo", size: 2 },
      { id: "opciones", label: "Opciones", size: 2 }
  ];
  this.estadosCuentaService.syncGetEstadosCuentaToPromise()
      .then((res) => {
        console.log(res)
        this.temp = [...res];

      // push our inital complete list
      this.rows = res;
      });
  }
editarElemento(row) {
  console.log(row,'editarElemento');
  let i = this.rows.findIndex( e => e.id == row.id);
  if(i >= 0){
    console.log('elemento',this.rows[i])
  }
}
borrarElemento(row) {
  let i = this.rows.findIndex( e => e.id == row.id);
  if(i >= 0){
    console.log('elemento',this.rows[i])
  }

  console.log(row,'borrarElemento');
}


 updateFilter(event) {
  const val = event.target.value.toLowerCase();

  // filter our data
  const temp = this.temp.filter(function (d) {
  //d.nombre, d.descripcion, etc..
  console.log('d',d)
    return d.usuario.toLowerCase().indexOf(val) !== -1 || !val;
  });

  // update the rows
  this.rows = temp;
  // Whenever the filter changes, always go back to the first page
  this.table.offset = 0;

}

  cargarDatos2(){
this.alertasService.presentaLoading('Cargando datos..')
    this.estadosCuentaService.syncGetEstadosCuentaToPromise().then(resp =>{
this.alertasService.loadingDissmiss();
this.estadosCuentaService.estadosCuentaArray = resp;
    }, error =>{
this.alertasService.loadingDissmiss();
this.alertasService.message('APP', 'Lo sentimos algo salio mal..')

    })
  }

  enviarCorreo(estado:EstadosCuenta){
 //this.correoService.enviarCorreo(estado)
  }
  onSearchChange(event){

    this.textoBuscar = event.detail.value;
      }
  async estadoCuenta(){
    this.isOpen = true;
    
    
          const modal = await this.modalCtrl.create({
     component:EstadoCuentaPage,
     cssClass:'alert-modal'
          });
    
    if(this.isOpen){
    
      modal.present();
      const {data} = await modal.onWillDismiss();
      this.isOpen = false;
      if(data != undefined){

        this.estadosCuentaService.syncGetEstadosCuentaToPromise().then(resp =>{
          this.estadosCuentaService.estadosCuentaArray = resp;
        //  this.correoService.enviarCorreo(data.estado);
              }, error =>{
          this.alertasService.message('APP', 'Lo sentimos algo salio mal..')
          
              })


         
      }
    }
    

  }


  descargarArchivo(estado:EstadosCuenta){
    this.estadosCuentaService.syncGetArchivoEstadosCuenta(estado.id).then(resp =>{

      console.log('resp')
    }, error =>{
      this.alertasService.message('APP', 'Lo sentimos algo salio mal..')
    })
  }
}
