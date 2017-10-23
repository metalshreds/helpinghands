import { User } from './user';


export interface Task {
  //attributes for task.
  user : User;            //or put just put email attributes here
  timeDuration : number;
  timeStart : number;
  introduction : string;
  requirement : string;
  wantedSkill : string[];

}
