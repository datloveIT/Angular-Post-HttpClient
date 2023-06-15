import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IPost} from "../models/ipost";
import {PostService} from "../services/PostService";

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css'],
  providers: [PostService]
})
export class BlogComponent implements OnInit {
  postForm: FormGroup;
  postList: IPost[] = [];

  constructor(
    private postService: PostService,
    private fb: FormBuilder
  ) {
  }


  ngOnInit(): void {
    this.postForm = this.fb.group({
      title: ["", [Validators.required, Validators.minLength(10)]],
      body: ["",[Validators.required,Validators.minLength(10)]]
    });

    this.postService
      .getPosts()
      .subscribe(
        next => (this.postList = next),
          error => (this.postList = []),
          ()=>{console.log("complete")}
      );
  }
  deletePost(i:number) {
    const post = this.postList[i];
    this.postService.deletePost(post.id).subscribe(() => {
      this.postList = this.postList.filter(t => t.id !== post.id);
    });
  }
  onSubmit() {
    if (this.postForm.valid) {
      const {value} = this.postForm;
      this.postService.createPost(value)
        .subscribe(next => {
          this.postList.unshift(next);
          this.postForm.reset({
            title: '',
            body: ''
          });
        }, error => console.log(error));
    }
  }

}
