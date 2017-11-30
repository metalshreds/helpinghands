# helpinghands

This app allows users with a task to find helpers who have the skills to complete that task. Requesters create an account and can submit tasks they need help on. Helpers create an account and list their skills and interests, as requesters submit tasks, helpers will be notified if the requester has requested their help. The helper can then accept or decline the request. Additionally, helpers can request to be helpers. 

## Dependencies 
* Ionic 
* Firebase

## Installation 
* [Cordova and Ionic](http://ionicframework.com/docs/v1/guide/installation.html)
    * ```$sudo npm install -g cordova```
    * ```$sudo npm install -g ionic```
    
* [Firebase](https://firebase.google.com/)
    * ```$ npm install firebase angularfire2 --save ```
* Camera   
    * ```$ ionic cordova plugin add cordova-plugin-camera```
    * ```$ npm install --save @ionic-native/camera```
* PhotoViewer
    * ```$ionic cordova plugin add com-sarriaroman-photoviewer```
    * ```$npm install --save @ionic-native/photo-viewer```
* cloudbase
    * ```$npm install firebase@4.6.0 --save```
    * ```npm install algoliasearch --save```
* DatePicker
    * ```$ionic cordova plugin add cordova-plugin-datepicker```
    * ```$npm install --save @ionic-native/date-picker```

## Running the application
* clone the app onto the computer
    * ```$git clone https://github.com/emmanuel-contreras/helpinghands.git```
* cd into the folder
    * ```$cd helpinghands```
* Run the app
    * ```$ionic serve```
### Common Errors
*  [Namespace 'firebase' has no exported member 'Promise'.](https://stackoverflow.com/questions/46557694/update-issues-in-angularfire-5-0)
    * ```$npm uninstall angularfire2```
    * ```$npm install angularfire2 --save```
### Running Tests
* To run the tests install dependencies listed in this website [Ionic Jasmine Tutorial](https://leifwells.github.io/2017/08/27/testing-in-ionic-configure-existing-projects-for-testing/) 
    * ```npm install --save-dev angular2-template-loader html-loader jasmine jasmine-spec-reporter karma karma-chrome-launcher karma-jasmine karma-jasmine-html-reporter karma-sourcemap-loader karma-webpack karma-coverage-istanbul-reporter istanbul-instrumenter-loader null-loader protractor ts-loader ts-node @types/jasmine @types/node```
* Clone a copy of our repo
     * Run $ npm run test // for unit tests
     * Run $ npm run test-coverage //for test coverage
