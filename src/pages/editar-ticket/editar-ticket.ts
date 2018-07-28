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
  public image = '';
  public id;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiProvider
  ) {
    let id = this.navParams.get('id');
    this.api.getTicket(id).once('value').then((datos:any) => {
      let datos_procesados = datos.val();
      this.id = datos.key;

      this.nombre = datos_procesados.nombre;
      this.prioridad = datos_procesados.prioridad;
      this.image = datos_procesados.image;
    });
  }

  ionViewDidLoad() {}

  //Edita la información de un ticket
  public editarTicket() {
    let datos = {
      estado: 0,
      nombre: this.nombre,
      prioridad: this.prioridad
    }
    this.api.editTicket(this.id, datos, () => {
      this.navCtrl.pop();
    });
  }

  //Elimina un ticket
  public eliminarTicket() {
    this.api.eliminarTicket(this.id, () => {
      this.navCtrl.pop();
    });
  }

  //Marca un ticket como resuelto
  public resolverTicket() {
    this.api.resolverTicket(this.id, () => {
      this.navCtrl.pop();
    });
  }
}
