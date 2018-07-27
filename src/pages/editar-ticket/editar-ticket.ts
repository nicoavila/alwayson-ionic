import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-editar-ticket',
  templateUrl: 'editar-ticket.html',
})
export class EditarTicketPage {

  public prioridad;
  public nombre;
  public image;
  public datos;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiProvider
  ) {
    let id = this.navParams.get('id');
    this.api.getTicket(id).once('value').then((datos:any) => {
      let datos_procesados = datos.val();
      this.datos = datos_procesados;

      this.nombre = datos_procesados.nombre;
      this.prioridad = datos_procesados.prioridad;
    });
  }

  ionViewDidLoad() {}


}
