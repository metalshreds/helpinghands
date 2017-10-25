import { User } from './user';


export class Task {
  //attributes for task.
  constructor(
    public timeDuration : number,
    public timeStart : number,
    public introduction : string,
    public requirement : string,
    public wantedSkill : boolean[],
    public complete: boolean,
    public id: number,
    public name: string,
    public helpers: User[],
    public appliedHelpers: User[]
  ){}
}
