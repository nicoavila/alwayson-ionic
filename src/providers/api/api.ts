import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { asPureExpressionData } from '../../../node_modules/@angular/core/src/view';

@Injectable()
export class ApiProvider {

  constructor() {}

  public getTickets() {
    return firebase.database().ref('/tickets');
  }
}
