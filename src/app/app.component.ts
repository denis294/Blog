import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'blog';
  constructor() {
    var config = {
      apiKey: "AIzaSyAkLvIBOyqkVtsHFXcP4UD3kXdYe0mHHrc",
      authDomain: "blog-1c61f.firebaseapp.com",
      databaseURL: "https://blog-1c61f.firebaseio.com",
      projectId: "blog-1c61f",
      storageBucket: "blog-1c61f.appspot.com",
      messagingSenderId: "658347637716"
    };
    firebase.initializeApp(config);
  
  }
}
