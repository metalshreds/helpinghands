import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TaskViewPage } from './task-view';

@NgModule({
  declarations: [
    TaskViewPage,
  ],
  imports: [
    IonicPageModule.forChild(TaskViewPage),
  ],
})
export class TaskViewPageModule {}
