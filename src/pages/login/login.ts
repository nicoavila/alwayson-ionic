import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import * as firebase from 'firebase';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public email:string = '';
  public pass:string = '';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loading: LoadingController,
    public toast: ToastController
  ) {}

  ionViewDidLoad() {

  }

  public login() {
    let username = this.email;
    let password = this.pass;
    let cargando = this.loading.create({
      content: 'Autenticando...'
    });
    cargando.present();
    firebase.auth().signInWithEmailAndPassword(username, password).then((resultado) => {
      cargando.dismiss();
      this.navCtrl.setRoot('ListaTicketsPage');
    }, (error) => {
      cargando.dismiss();

      let toast = this.toast.create({
        message: 'Ocurrió un error al autenticarse',
        duration: 3000
      });
      toast.present();
      console.log(error);
    })
  }
}
