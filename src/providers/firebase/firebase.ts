import { Injectable } from '@angular/core';
import { ProfileProvider } from "../../providers/profile/profile";
import  firebase  from 'firebase';
import { AngularFireDatabase, AngularFireObject } from "angularfire2/database";
import 'rxjs/add/operator/map';

/*
  Generated class for the FirebaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseProvider {

  constructor() {

  }


  /*
  / This function is to add updateMessage to the specified sub path of the user node
  / that represents current user.
  */
  singleStringUpdate = function(subPath : string, updateMessage : string, userId : string) : any
  {
    var updateMsg = {}                                                        //declare and initialize updateMsg variable
    updateMsg['user/' + userId + '/' + subPath] = updateMessage;     //set correct path using subPath and assign update value
    return firebase.database().ref().update(updateMsg);                              // updating to firebase using firebase API
  }

  /*
  /  this function will find user node using userId and return value
  /  of the node
  */

  // getUserProfile = function(userId : string, profile)
  // {
  //   var user;
  //   var userRef = firebase.database().ref('user/' + userId);            //get a node reference with path specified by userId
  //   userRef.once('value', function(snapshot)         // read node value once use firebase API
  //   {
  //     user = snapshot.val()                                               //return node value.
  //     profile(user);
  //
  //   })
  // }

  /*
  / search user using user's name
  */
  // getUserByName = function(name : string) : any
  // {
  //   var userRef = firebase.database().ref('user');
  //   userRef.orderByChild("lastName").equalTo(name).on("child_added", function(snapshot) {
  //     console.log(snapshot.key);
  //   });
  // }


}
