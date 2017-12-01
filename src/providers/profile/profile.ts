import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { TaskObjectProvider } from '../task-object/task-object'; //provider
import  * as firebase  from 'firebase';
import 'firebase/firestore';
import { AngularFireDatabase, AngularFireObject } from "angularfire2/database";

/*
  Generated class for the ProfileProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ProfileProvider {
  db = firebase.firestore();
  public email: string;  //type string
  public password: string;
  public userId: string;
  public lastName: string;
  public firstName: string;
  public introduction: string;
  public zipCode : string;
  public phone : number;
  public skills = new Object();
  public ownedTask : TaskObjectProvider[] = [];
  public blockListTask: TaskObjectProvider[] = [];
  public confirmTask: TaskObjectProvider[] = [];
  public pendingTask: TaskObjectProvider[] = [];
  public participateTask: TaskObjectProvider[] = [];
  public travelRadius : number;
  public taskCount : number;
  public photoUrl : string;
  public isHelper : boolean;
  public rating : number;

  constructor(
    lastName : string,
    firstName : string,
    uid : string,
    email : string,
    introduction : string,
    skills : string,
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
    this.photoUrl = null;
  }

  /*
  /
   */

//TODO method to retrieve user info

//TODO method to edit/update user info
  addToOwned(count, task) {
    this.ownedTask[count] = task;
  }
//TODO create a new task (return new task object)

//TODO update a new task (doesn't return)

//TODO method to retrieve user info


}
