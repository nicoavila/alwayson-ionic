import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { LoadingController } from 'ionic-angular';

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
    public camera: Camera,
    public loading: LoadingController
  ) {
  }

  public tomarFoto() {
    const opcionesCamara: CameraOptions = {
      quality: 25,
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
    //Crea el objeto que se va a subir
    let nuevoDato = {
      estado: 0,
      nombre: this.nombre,
      prioridad: this.prioridad,
      image: null
    }

    //Crea el loading y lo muestra
    let loading = this.loading.create({
      content: 'Subiendo archivo y ticket...'
    });
    loading.present();

    //Crea una referencia de upload y se establece el formato en que se va a subir
    let ref = this.api.subirStorage(this.image);
    let upload = ref.putString(this.image, 'data_url');

    //Observa los cambios en el upload para realizar alguna acción
    upload.on('state_changed', (snapshot:any) => {
      let progreso = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      loading.setContent('Subiendo (' + progreso + '%)');
    }, (error) => {

    }, () => {
      //Cuando termina obtiene la URL pública del archivo, para asi guardar esa URL en el objeto que se va a subir a Realtime Database
      upload.snapshot.ref.getDownloadURL().then((url) => {
        nuevoDato.image = url;
        this.api.addTicket(nuevoDato, (resultado) => {
          //Saca el loading y vuelve a la página inicial
          loading.dismiss();
          this.navCtrl.pop();
        });
      });
    });
  }
}
