import { Task } from './task';

export class userProfile{

  constructor(   public email: string,     //type string
                 public password: string,
                 public userId: string,
                 public lastName: string,
                 public firstName: string,
                 public introduction: string,
                  //interests: string[];
                 public skills: boolean[],
                 public ownedTask: Task[],
                 public blackListTask: Task[],
                 public confirmTask: Task[],
                 public pendingTask: Task[]) {}

                createTask(){
                  var skill = [ true, false, true, false];
                  var task = new Task(this, 10, 10, "thisisintroduction", "wanted", skill )
                  this.ownedTask.push(task);
                }
      //TODO method to retrieve user info

    //TODO method to edit/update user info

    //TODO create a new task (return new task object)

    //TODO update a new task (doesn't return)

    //TODO method to retrieve user info

}
//https://www.firebase.com/docs/web/guide/user-auth.html#section-storing
//https://firebase.google.com/docs/auth/web/manage-users#get_a_users_provider-specific_profile_information

