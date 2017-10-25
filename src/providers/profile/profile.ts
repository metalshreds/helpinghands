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

  constructor(    email: string,     //type string
                  password: string,
                  userId: string,
                  lastName: string,
                  firstName: string,
                  introduction: string,
                  //interests: string[];
                  skills: boolean[],
                  ownedTask: Task[],
                  blackListTask: Task[],
                  confirmTask: Task[],
                  pendingTask: Task[])
  {

  }


//TODO method to retrieve user info

//TODO method to edit/update user info

//TODO create a new task (return new task object)

//TODO update a new task (doesn't return)

//TODO method to retrieve user info

}
