import { Injectable } from '@angular/core';
import  firebase  from 'firebase';
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
  getUserProfile = function(userId : string) : any
  {
    var userRef = firebase.database().ref('user/' + userId);            //get a node reference with path specified by userId
    userRef.once('value').then(function(snapshot)                       // read node value once use firebase API
    {
      var user = snapshot.val()                                         //return node value.
      return user;
    })
  }
}
