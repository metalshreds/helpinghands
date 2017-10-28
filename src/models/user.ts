
import {TaskObjectProvider} from "../providers/task-object/task-object";

export interface User{
  email: string;     //type string
  password: string;
  userId: string;
  lastName: string;
  firstName: string;
  introduction: string;
  //interests: string[];
  skills: boolean[];
  ownedTask: TaskObjectProvider[];
  blackListTask: TaskObjectProvider[];
  confirmTask: TaskObjectProvider[];
  pendingTask: TaskObjectProvider[];

}

//https://www.firebase.com/docs/web/guide/user-auth.html#section-storing
//https://firebase.google.com/docs/auth/web/manage-users#get_a_users_provider-specific_profile_information
//TODO method to retrieve user info

//TODO method to edit/update user info

//TODO create a new task (return new task object)

//TODO update a new task (doesn't return)

//TODO method to retrieve user info
