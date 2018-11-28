
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Post } from '../models/post.model';
import * as firebase from 'firebase';
import  Datasnapshot = firebase.database.DataSnapshot;





@Injectable({
  providedIn: 'root'
})

export class PostService {

 

  constructor() {
    this.getPosts();
}

  posts: Post[] = [];
  postSubject = new Subject<Post[]>();

  emitPosts() {
    this.postSubject.next(this.posts);
  }

  savePosts(){
    firebase.database().ref('/posts').set(this.posts);
  }

  getPosts() {
    firebase.database().ref('/posts')
    .on('value', (data: Datasnapshot) => {
      this.posts = data.val() ? data.val() : [];
      this.emitPosts();
    })
  }

  getSinglePost(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/posts/' + id).once('value').then(
          (data: Datasnapshot) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        )
      }
    )
  }

  createNewPost(newPost: Post) {
    this.posts.push(newPost);
    this.savePosts();
    this.emitPosts();
  }

  removePost(post: Post) {
    const postIndexToRemove = this.posts.findIndex(
      (postEl) => {
        if(postEl === post) {
          return true;
        }
      }
    );
    this.posts.splice(postIndexToRemove, 1);
    this.savePosts();
    this.emitPosts();
  }

  like(post: Post) {
    post.loveit ++;
    this.savePosts();
    this.emitPosts();
  }

  nolike(post: Post){
    post.loveit --;
    this.savePosts();
    this.emitPosts();

  }
  
}
