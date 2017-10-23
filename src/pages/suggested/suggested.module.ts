import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SuggestedPage } from './suggested';

@NgModule({
  declarations: [
    SuggestedPage,
  ],
  imports: [
    IonicPageModule.forChild(SuggestedPage),
  ],
})
export class SuggestedPageModule {}
