import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import * as randomstring from 'randomstring';

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

  //Editar ticket
  public editTicket(id, data, callback) {
    return firebase.database().ref('/tickets/' + id).set(data, callback);
  }

  //Eliminar Ticket
  public eliminarTicket(id, callback) {
    return firebase.database().ref('/tickets/' + id).remove(callback);
  }

  //Resolver Tickets
  public resolverTicket(id, callback) {
    let dato = {
      estado: 1
    }
    return firebase.database().ref('/tickets/' + id).update(dato, callback);
  }

  //Subir un archivo a Firebase Storage y retornar la URL a ese archivo
  public subirStorage(dataURL) {
    let rutaArchivo = '/' + randomstring.generate() + '.jpg';
    return firebase.storage().ref(rutaArchivo);
  }
}
