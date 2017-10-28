import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  This provider is for task object
*/
@Injectable()
export class TaskObjectProvider {
  public timeDuration : number;     //duration of the task
  public timeStart : string;          //start time of the task
  public introduction : string;       //brief intro/background of this task
  public requirement : string;        //requirement/qualification of this task
  public wantedSkill : boolean[]=[];  //skill set of the task
  public complete: boolean;           //flag that indicates the completion of the task
  public id: number;                  //task's unique id generated when during task creation
  public name: string;                //task's name
  public helpers: string[] = [];  //store participator's user id
  public appliedHelpers: string[] = [];  //store applicant user id
  public owner : string;                  //onwer of this task.

  /*constructor doesn't need helpers[] and appliedhelpers[]
  / as input because the those list are empty when we construct
  / a task object.
  */
  constructor(name: string,
              timeDuration : number,
              timeStart : string,
              introduction : string,
              requirement : string,
              wantedSkill : boolean[],
              complete : boolean,
              owner : string,
              ) {
    this.name = name;
    this.timeDuration = timeDuration;
    this.timeStart = timeStart;
    this.introduction = introduction;
    this.requirement = requirement;
    this.wantedSkill = wantedSkill;
    this.complete = complete;
    this.owner = owner;

  }


  //FUNCTIONS

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



}

