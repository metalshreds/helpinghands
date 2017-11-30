import { Injectable } from '@angular/core';
import { ProfileProvider } from "../providers/profile/profile";
import  * as firebase  from 'firebase';
import 'firebase/firestore';
import { AngularFireDatabase, AngularFireObject } from "angularfire2/database";
import 'rxjs/add/operator/map';

/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class cloudProvider {
  db = firebase.firestore();
  constructor() {

  }

    //data hierarchy
    //user(collection)
    //      userA(doc) : userId
    //           lastName:
    //           firstName:
    //           etc..
    //           skills :{ software : true, hardware : true, ... }
    //           OwnedList(collection)
    //                list1(doc)
    //                    listinfo:
    //                list2(doc)
    //                    listinfo:
    //           participatedList(collection)
    //                list(doc)
    //                    listinfo:
    //
    //      userB
    //             ...
    ////////////////////////////////
    //task(collection)
    //      TaskA (doc) : task ID
    //        taskName:
    //        owner:
    //        etc...
    //        participator(collection)
    //            user1(doc)
    //      TaskB (doc) : task ID


  /*
  / This function is to add updateMessage to the specified sub path of the user node
  / that represents current user.
  */
  singleStringUpdate = function(subPath : string, updateMessage : any, userId : string) : any
  {
    var docRef = this.db.collection('users').doc(userId);
    docRef.update({ [subPath] : updateMessage});
  }
  /*
  / add task to corresponding user's sublist.
  / input: userId - user's id
  /        subPath - the name of the list under user
  /        taskId - the id of the task
  /        taskName - the name of the task
  */
  addTaskToList = function(userId : string, subPath : string, taskId : string, taskName : string)
  {
    var docRef = this.db.collection('users').doc(userId).collection(subPath).doc(taskId);
    docRef.set({'taskName' : taskName});
    // docRef.get().then(doc=>{
    //   var index = this.client.initIndex('users');
    //   var user = doc.data();
    //   user.objectID = (userId);
    //   index.saveObject(user);
    // });
  }


}
