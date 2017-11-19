import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular'
import { CommentPopover } from './comment-popover';

@NgModule({
  declarations: [
    CommentPopover,
  ],
  imports: [
    IonicPageModule.forChild(CommentPopover),
  ],
  entryComponents: [
    CommentPopover,
  ]
})
export class CommentPopoverModule {}
