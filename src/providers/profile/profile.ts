import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { TaskObjectProvider } from '../task-object/task-object'; //provider

/*
  Generated class for the ProfileProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProfileProvider {
  public email: string;  //type string
  public password: string;
  public userId: string;
  public lastName: string;
  public firstName: string;
  public introduction: string;
  //interests: string[];
  public skills: boolean[];
  public oTask : Array<TaskObjectProvider> = [];
  public ownedTask : TaskObjectProvider[] = [];
  public blackListTask: TaskObjectProvider[] = [];
  public confirmTask: TaskObjectProvider[] = [];
  public pendingTask: TaskObjectProvider[] = [];

  constructor( ) {

  }

  createTask(){
    var skill = [ true, false, true, false];
    let Task = new TaskObjectProvider( "taskname", 10, "startdate", "introduction", "requirment", skill, false, this.userId);
    let Task1 = new TaskObjectProvider( "taskname1", 10, "startdate1", "introduction1", "requirment1", skill, false, this.userId);
    this.oTask.push(Task);
    this.oTask.push(Task1);
  }

//TODO method to retrieve user info

//TODO method to edit/update user info

//TODO create a new task (return new task object)

//TODO update a new task (doesn't return)

//TODO method to retrieve user info

}
