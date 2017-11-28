/**
 * Created by Kiegan on 11/26/2017.
 */
import {ProfileProvider} from './profile';
import {TaskObjectProvider} from '../task-object/task-object'

let profile = null;
let task = null;

beforeEach(() =>{
  profile = new ProfileProvider(
    'Test',
    'Profile',
    '5h5b282lskhs',
    'dummy@wisc.edu',
    'intro',
    'true',
    '53916',
    9514872364,
    56,
    1
  );

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


});
describe( 'The profile',() => {

  it(' first name should be a string', () => {

    expect(profile.firstName).toEqual('Profile');

  });
  it('phone number should be a number', () => {

    expect(typeof profile.phone).toBe('number');

  });
  it('should add task to owned', () => {

    profile.addToOwned(1, task);
    expect(profile.ownedTask[1]).toBeTruthy();

  });

});
