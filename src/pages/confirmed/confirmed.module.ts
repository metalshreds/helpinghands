import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ConfirmedPage } from './confirmed';

@NgModule({
  declarations: [
    ConfirmedPage,
  ],
  imports: [
    IonicPageModule.forChild(ConfirmedPage),
  ],
})
export class ConfirmedPageModule {}
