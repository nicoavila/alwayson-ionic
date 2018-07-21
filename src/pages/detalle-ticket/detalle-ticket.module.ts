import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalleTicketPage } from './detalle-ticket';

@NgModule({
  declarations: [
    DetalleTicketPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalleTicketPage),
  ],
})
export class DetalleTicketPageModule {}
