import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as algoliasearch from 'algoliasearch';
import firebase from 'firebase';

/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  items;  
  
  
  ALGOLIA_INDEX_NAME = "users";
  client = algoliasearch('EHHE2RV41W', 'c7820526d3420ae56da74d38b535a1f6');
  index = this.client.initIndex('users');
  db = firebase.firestore();
  //https://github.com/firebase/functions-samples/blob/master/fulltext-search/functions/index.js
  //https://stackoverflow.com/questions/45274485/how-to-integrate-algolia-in-ionic3
  //https://github.com/algolia/algoliasearch-client-javascript
  //https://firebase.google.com/docs/firestore/solutions/search?authuser=2
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.initializeItems();
  }

    initializeItems() {
      var getDoc = this.db.collection('users');
      console.log(getDoc);
      this.items = [
      
      ];
    }

    getItems(ev) {
      //https://firebase.google.com/docs/firestore/solutions/search?authuser=2
      // Reset items back to all of the items
      this.initializeItems();

      // set val to the value of the ev target
      var val = ev.target.value;

      // if the value is an empty string don't filter the items
      if (val && val.trim() != '') {
        this.items = this.items.filter((item) => {
          return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

}
