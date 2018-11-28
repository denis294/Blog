import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { Post } from '../models/post.model';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';


@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  posts: Post[] = [];
  postSubscription: Subscription;

  constructor(private postService: PostService, private router: Router) { }

  ngOnInit() {
    this.postSubscription = this.postService.postSubject.subscribe(
      (posts: Post[]) => {
        this.posts = posts;
      }
    );
    this.postService.emitPosts();
  }

  onNewPost() {
    this.router.navigate(['/posts', 'new']);
  }


  onDeletePost(post: Post) {
    this.postService.removePost(post);
  }


  onViewPost(id: number) {
    this.router.navigate(['/posts', 'view', id]);
  }

  

  ngOnDestroy() {
    this.postSubscription.unsubscribe();
  }

  onLike(post: Post) {
    console.log('Like!');
    this.postService.like(post);
  }

  onNolike(post: Post) {
    console.log('Dont like!');
    this.postService.nolike(post);
  }

}
