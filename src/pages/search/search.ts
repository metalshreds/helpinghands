import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as algoliasearch from 'algoliasearch';
import { ProfileProvider } from '../../providers/profile/profile'
import * as firebase from 'firebase';


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


  client = algoliasearch('EHHE2RV41W', 'c7820526d3420ae56da74d38b535a1f6');
  userIndex = this.client.initIndex('users');

  items;

  /*
  / Search page:
  / normal search : search whole word:
  / advance search : (use a load/activesheet)
  /           1. search user only(toggle maybe)
  /           2. search task only
  /
  / ranking method:
  /           1. by time
  /           2. by rating
  /           3. by relavence (need figure out how to calculate it)
  /           4. by location (use google map api)
  */

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

    // // if the value is an empty string don't filter the items
    // if (val && val.trim() != '') {
    //     var query = val.trim();
    //     var index = this.client.initIndex('users');
    //     userIndex.search({query}).then(responses=>{
    //       console.log(responses.hits);
    //         for(const hit in responses.hits){
    //               this.items.push(responses.hits[hit]);
    //               console.log(responses.hits[hit]);
    //         }
    //     })
    // }

    if (val && val.trim() != '')
    {
      var query = val.trim();
      this.db.collection('users').where('skill.'+query, '==', true ).get()
        .then((doc)=>{
          doc.forEach(sdoc=>{
            console.log("search is ", sdoc.data());
            var CURRENT_USER = {} as ProfileProvider;
            var displaySkill  = [];
            for(const field in sdoc.data())
            {
              CURRENT_USER[field] = sdoc.data()[field];
            }
            
            for (const i in CURRENT_USER.skill)
            {
              if (CURRENT_USER.skill[i] == true)
                displaySkill.push(i);
            }
            CURRENT_USER['skillset'] = displaySkill;  //tmp fix
            CURRENT_USER['id'] = sdoc.id; //tmp fix, add those in user object later
            console.log(displaySkill);
            this.items.push(CURRENT_USER);
            
          })
        
        })
    }

  }



  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

}
