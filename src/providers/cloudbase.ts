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
    //      userA(doc) (userId)
    //        lastName:
    //        firstName:
    //        etc..
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
    //

  /*
  / This function is to add updateMessage to the specified sub path of the user node
  / that represents current user.
  */
  singleStringUpdate = function(subPath : string, updateMessage : any, userId : string) : any
  {
    var docRef = this.db.collection('users').doc(userId);
    docRef.update({ [subPath] : updateMessage});
  }

 // UpdateAllProfileField = function(updateMessage)





}
