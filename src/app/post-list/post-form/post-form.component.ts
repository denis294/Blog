import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../services/post.service';
import { Post } from '../../models/post.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {

  postForm: FormGroup;
  datepost = Date.now();

  constructor(private formBuilder: FormBuilder, private postService: PostService, private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
      loveit: '', 
    })
  }

  onSavePost() {
    console.log(this.datepost);
    const title = this.postForm.get('title').value;
    const content = this.postForm.get('content').value;
    const date = this.datepost;
    const loveit = 0;
    const newPost = new Post(title, content);
    newPost.date = date;
    newPost.loveit = loveit;
    console.log(newPost);
    this.postService.createNewPost(newPost);
    this.router.navigate(['/posts']);
  }


}
