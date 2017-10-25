import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Task} from "../../models/task";

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
  public ownedTask : Task[];
  public blackListTask: Task[];
  public confirmTask: Task[];
  public pendingTask: Task[];
  constructor( ) {
    this.ownedTask = [];
  }

                  createTask(){
                    var skill = [ true, false, true, false];
                    var task = new Task( 10, 10, "thisisintroduction", "wanted", skill )
                    this.ownedTask.push(task);
                  }

//TODO method to retrieve user info

//TODO method to edit/update user info

//TODO create a new task (return new task object)

//TODO update a new task (doesn't return)

//TODO method to retrieve user info

}
