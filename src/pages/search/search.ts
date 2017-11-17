import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as algoliasearch from 'algoliasearch';
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
  functions = require('firebase-functions')
  ALGOLIA_ID = this.functions.config().algolia.app_id;
  ALGOLIA_ADMIN_KEY = this.functions.config().algolia.api_key;
  
  ALGOLIA_INDEX_NAME = "notes";
  client = algoliasearch(this.ALGOLIA_ID, this.ALGOLIA_ADMIN_KEY);

  //https://github.com/firebase/functions-samples/blob/master/fulltext-search/functions/index.js
  //https://stackoverflow.com/questions/45274485/how-to-integrate-algolia-in-ionic3
  //https://github.com/algolia/algoliasearch-client-javascript
  //https://firebase.google.com/docs/firestore/solutions/search?authuser=2
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.initializeItems();

  }

    initializeItems() {
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
