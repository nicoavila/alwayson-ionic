import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-lista-tickets',
  templateUrl: 'lista-tickets.html',
})
export class ListaTicketsPage {

  public tickets = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiProvider,
    public loading: LoadingController
  ) {
    let cargando = this.loading.create({
      content: 'Cargando datos...'
    });
    cargando.present();
    this.api.getTickets().on('value', (snapshot) => {
      this.tickets = [];
      snapshot.forEach((row:any) => {
        let id = row.key;
        let data = row.val();

        this.tickets.push({
          id: id,
          nombre: data.nombre,
          estado: data.estado,
          prioridad: data.prioridad
        })
      });
      cargando.dismiss();
    });
  }

  ionViewDidLoad() {
  }

  //Ve el detalle de un ticket (edición)
  public detalleTicket(id) {
    this.navCtrl.push('EditarTicketPage', {
      id: id
    });
  }

  //Añade un nuevo ticket
  public addTicket() {
    this.navCtrl.push('NuevoTicketPage');
  }
}
