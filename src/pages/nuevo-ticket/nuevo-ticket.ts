import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { Camera, CameraOptions } from '@ionic-native/camera';

@IonicPage()
@Component({
  selector: 'page-nuevo-ticket',
  templateUrl: 'nuevo-ticket.html',
})
export class NuevoTicketPage {

  public prioridad;
  public nombre;
  public image = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: ApiProvider,
    public camera: Camera
  ) {
  }

  public tomarFoto() {
    const opcionesCamara: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(opcionesCamara).then((datosImg) => {
      this.image = 'data:image/jpeg;base64,' + datosImg;
    }, (error) => {
      console.log(error);
    })
  }

  ionViewDidLoad() {}

  public nuevoTicket() {
    let nuevoDato = {
      estado: 0,
      nombre: this.nombre,
      prioridad: this.prioridad
    }
    this.api.addTicket(nuevoDato, (resultado) => {
      this.navCtrl.pop();
    });
  }
}
