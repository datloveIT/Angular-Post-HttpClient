import {Component, OnInit} from '@angular/core';
import {IPost} from "../models/ipost";
import {ActivatedRoute} from "@angular/router";
import {PostService} from "../services/PostService";

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css'],
  providers: [PostService]
})
export class BlogDetailComponent implements OnInit {
  post: IPost;
  myServiceId: number;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {
  }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get("id");
    this.postService.getPostById(id).subscribe(
      next => (this.post = next),
      error => {
        console.log(error),
          this.post = null;
      }
    )
  }

}
