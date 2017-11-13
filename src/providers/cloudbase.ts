import { Injectable } from '@angular/core';
import { ProfileProvider } from "../providers/profile/profile";
import  * as firebase  from 'firebase';

import { AngularFireDatabase, AngularFireObject } from "angularfire2/database";
import 'rxjs/add/operator/map';

/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class cloudProvider {

  constructor() {

  }
  getCloudBase()
  {
    const admin = require('firebase-admin');
    const functions = require('firebase-functions');
    admin.initializeApp(functions.config().firebase);
    var cloudDatabse = admin.firestore();
    console.log("here");
    return cloudDatabse;
  }


  /*
  / This function is to add updateMessage to the specified sub path of the user node
  / that represents current user.
  */
  singleStringUpdate = function(subPath : string, updateMessage : string, userId : string) : any
  {
    var docRef = this.db.collection('users').doc(userId);
    docRef.set({
      string: updateMessage,
    })
  }





}
