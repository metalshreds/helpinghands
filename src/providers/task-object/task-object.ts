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
  public duration : number;     //duration of the task
  public startDate : string;          //start time of the task
  public endDate: string;

  //Skills and status
  public wantedSkills = new Object();  //skill set of the task
  public completed: boolean;           //flag that indicates the completion of the task
  public ownerComment: string = '';            // comment on quality of helper
  public helpers: string[] = [];  //store participator's user id
  public appliedHelpers: string[] = [];  //store applicant user id
  public location: string;
  public compensation: number;
  //Task
  public taskId: string;                  //task's unique id generated when during task creation
  public taskName: string;                //task's name
  public taskDescription : string;       //brief intro/background of this task
  public photoUrl: string;
  /*constructor doesn't need helpers[] and appliedhelpers[]
  / as input because the those list are empty when we construct
  / a task object.
  */
  constructor(taskName: string,
              taskId : string,
              timeDuration : number,
              timeStart : string,
              timeEnd : string,
              taskDescription : string,
              complete : boolean,
              owner : string,
              ownerUserId : string,
              location : string,
  ) {
    this.taskName = taskName;
    this.taskId = taskId;
    this.duration = timeDuration;
    this.startDate = timeStart;
    this.taskDescription = taskDescription;
    this.endDate = timeEnd;
    this.completed = complete;
    this.ownerUserId = ownerUserId;
    this.ownerName = owner;
    this.location = location;
  }

  //FUNCTIONS
  setTaskId(taskId: string){ this.taskId = taskId; }
  getTaskId(){ return this.taskId; }

  setWantedSkill(skillSet){
    this.wantedSkills = skillSet;
  }
  setHelperArray(helper)
  {
    this.helpers = helper;
  }
  setAppliedHelpers(applicant)
  {
    this.appliedHelpers = applicant;
  }
  setOwnerName(ownerName: string){this.ownerName = ownerName;}
  getOwnerName(){return this.ownerName};

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
