import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  This provider is for task object
*/
@Injectable()
export class TaskObjectProvider {

  //Users
  public ownerUserId : string;                  //owner of this task.
  public ownerName : string;

  //Time
  public timeDuration : number;     //duration of the task
  public timeStart : string;          //start time of the task
  public timeEnd: string;

  //Skills and status
  public wantedSkill = new Object();  //skill set of the task
  public complete: boolean;           //flag that indicates the completion of the task
  public ownerComment: string = '';            // comment on quality of helper
  public helpers: string[] = [];  //store participator's user id
  public appliedHelpers: string[] = [];  //store applicant user id
  //Task
  public taskId: string;                  //task's unique id generated when during task creation
  public taskName: string;                //task's name
  public taskDescription : string;       //brief intro/background of this task

  /*constructor doesn't need helpers[] and appliedhelpers[]
  / as input because the those list are empty when we construct
  / a task object.
  */
  constructor(taskName: string,
              timeDuration : number,
              timeStart : string,
              taskDescription : string,
              timeEnd : string,
              wantedSkill : string[],
              complete : boolean,
              owner : string,
  ) {
    this.taskName = taskName;
    this.timeDuration = timeDuration;
    this.timeStart = timeStart;
    this.taskDescription = taskDescription;
    this.timeEnd = timeEnd;
    this.wantedSkill = wantedSkill;
    this.complete = complete;
    this.ownerUserId = owner;

  }

  //FUNCTIONS
  setTaskId(taskId: string){ this.taskId = taskId; }
  getTaskId(){ return this.taskId; }

  /*this function is used to set the helpers list
  / of a newly constructed task.
  / possible usage: construct a task object based
  / on information retrieved from database.*/
  setHelperList(helpers : string[])
  {
    this.helpers = helpers;
  }

  /*this function is used to set the applicants list
  / of a newly constructed task.
  / possible usage: construct a task object based
  / on information retrieved from database.*/
  setAppliedHelperList(appliedHelpers : string[])
  {
    this.appliedHelpers = appliedHelpers;
  }

  setOwnerComment(comment: string){

    this.ownerComment = comment;

  }


}
