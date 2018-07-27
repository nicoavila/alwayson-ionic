import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class ApiProvider {

  constructor() {}

  //Obtiene todos los tickets
  public getTickets() {
    return firebase.database().ref('/tickets');
  }

  //Obtiene un ticket
  public getTicket(id) {
    return firebase.database().ref('/tickets/' + id);
  }

  //Crea un nuevo ticket
  public addTicket(data, callback) {
    return firebase.database().ref('/tickets/').push(data, callback);
  }
}
