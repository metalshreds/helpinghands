import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as algoliasearch from 'algoliasearch';
import { ProfileProvider } from '../../providers/profile/profile'
import * as firebase from 'firebase';
import { TaskObjectProvider } from '../../providers/task-object/task-object';
import { ProfilePage } from '../profile/profile'
import { TaskViewPage } from '../task-view/task-view'


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

  SearchResult = 'User';
  client = algoliasearch('EHHE2RV41W', 'c7820526d3420ae56da74d38b535a1f6');
  userIndex = this.client.initIndex('users');

  items;
  resultTasks;
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
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.initializeItems();
  }


    initializeItems() {
      this.items = [];
      this.resultTasks = [];
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
      //use cloudbase query
      query = query.charAt(0).toUpperCase()+query.slice(1); //capitalize first letter to match the key in database
      this.db.collection('users').where('skills.'+query, '==', true ).get()
        .then((doc)=>{
          doc.forEach(sdoc=>{
            console.log("search is ", sdoc.data());
            var CURRENT_USER = {} as ProfileProvider;
            var displaySkill  = [];
            for(const field in sdoc.data())
            {
              CURRENT_USER[field] = sdoc.data()[field];
            }
            
            for (const i in CURRENT_USER.skills)
            {
              if (CURRENT_USER.skills[i] == true)
                displaySkill.push(i);
            }
            CURRENT_USER['skillset'] = displaySkill;  //tmp fix
            CURRENT_USER['userId'] = sdoc.id;  //tmp fix
            console.log(displaySkill);
            this.items.push(CURRENT_USER);       
          })  
        })
      //use algolia query do whole word search on user
      //TODO: need to parse skill map to skill array
      var index = this.client.initIndex('users');
      index.search({query}).then(responses=>{
        console.log("algolia", responses.hits);
          for(const hit in responses.hits){
                this.items.push(responses.hits[hit]);
                console.log("this", responses.hits[hit]);
          }
      })

      //do task search query with skill
      this.db.collection('tasks').where('wantedSkills.'+query, '==', true ).get()
      .then(doc=>{
        doc.forEach(sdoc=>{
          var taskObject = {} as TaskObjectProvider;
          var skill = [];
          for(const field in sdoc.data())
          {
            taskObject[field] = sdoc.data()[field];
          }
          //put keys of wantedSkills map in a array for display purpose
          for (const i in taskObject.wantedSkills)
          {
            if (taskObject.wantedSkills[i] == true)
                skill.push(i);
          }
          taskObject['skillset'] = skill;
          //push in result array if this task is not completed
          if(!taskObject.completed)
            this.resultTasks.push(taskObject);
        })
      })
      //do whole word search on task
      var index = this.client.initIndex('tasks');
      index.search({query}).then(responses=>{
        console.log("algolia", responses.hits);
          for(const hit in responses.hits){
                if(!responses.hits[hit].completed)
                  this.resultTasks.push(responses.hits[hit]);
                console.log("this", responses.hits[hit]);
          }
      })
    }

  }

  userClicked(userId)
  {
    this.navCtrl.push(ProfilePage, {
      userId: userId
    });
  }

  
  taskClicked(task)
  {
    this.navCtrl.push(TaskViewPage, {
      task: task
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

}
