import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';

@IonicPage()
@Component({
  selector: 'page-nuevo-ticket',
  templateUrl: 'nuevo-ticket.html',
})
export class NuevoTicketPage {

  public prioridad;
  public nombre;
  public image;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public apiProvider: ApiProvider
  ) {
  }

  public tomarFoto() {}

  ionViewDidLoad() {}

  public nuevoTicket() {
    let nuevoDato = {
      estado: 0,
      nombre: this.nombre,
      prioridad: this.prioridad
    }
    this.apiProvider.addTicket(nuevoDato, (resultado) => {
      this.navCtrl.pop();
    });
  }
}
