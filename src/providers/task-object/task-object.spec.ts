import {TaskObjectProvider} from './task-object';

let task = null;
let helpers: string[];
let appliedHelpers: string[];

beforeEach(() =>{

  task = new TaskObjectProvider(
    'dummytask',
    5,
    '8:00 AM',
    'description',
    '1:00 PM',
    ['biology', 'progamming'],
    false,
    'owner'
  );

  helpers = ['helpers'];
  appliedHelpers = ['appliedHelpers'];



});

describe('the task ', () => {

  it('should be able to set its helpers', () => {

    task.setHelperList(helpers);
    expect(task.helpers).toBeTruthy();
    expect(task.helpers[0]).toEqual('helpers');

  });

  it('should be able to set its appliedHelpers', () => {

    task.setAppliedHelperList(appliedHelpers);
    expect(task.appliedHelpers).toBeTruthy();
    expect(task.appliedHelpers[0]).toEqual('appliedHelpers');

  });

  it('should be able to set its owner comment', () => {

    task.setOwnerComment('great help');
    expect(task.ownerComment).toEqual('great help');

  });

  it('should be able to set and get its id', () => {

    task.setTaskId('5ghb3kh226n6hsud');
    expect(task.getTaskId()).toEqual('5ghb3kh226n6hsud');

  });

});
