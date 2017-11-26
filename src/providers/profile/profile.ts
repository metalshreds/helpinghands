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
  public zipCode : string;
  public phone : number;
  //interests: string[];
  public skills: boolean[];
  public oTask : TaskObjectProvider[] = [];
  public ownedTask : TaskObjectProvider[] = [];
  public blackListTask: TaskObjectProvider[] = [];
  public confirmTask: TaskObjectProvider[] = [];
  public pendingTask: TaskObjectProvider[] = [];
  public travelRadius : number;
  public taskCount : number;
  constructor(
    lastName : string,
    firstName : string,
    uid : string,
    email : string,
    introduction : string,
    skills : boolean[],
    zipCode : string,
    phone : number,
    travelRadius : number,
    taskCount: number,
  ) {
    this.lastName = lastName;
    this.firstName = firstName;
    this.userId = uid;
    this.email = email;
    this.introduction = introduction;
    this.skills = skills;
    this.zipCode = zipCode;
    this.phone = phone;
    this.travelRadius = travelRadius;
    this.taskCount = taskCount;
  }

  /*
  /
   */
  createTask(){
    var skill = [ true, false, true, false];
  }

//TODO method to retrieve user info

//TODO method to edit/update user info
  addToOwned(count, task) {
    this.ownedTask[count] = task;
  }
//TODO create a new task (return new task object)

//TODO update a new task (doesn't return)

//TODO method to retrieve user info

}
