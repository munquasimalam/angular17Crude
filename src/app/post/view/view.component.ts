import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../post';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent {
  id! : number;
  post!:Post;

  constructor(public postService:PostService,private router:Router,private route:ActivatedRoute){
  }

  ngOnInit():void {
this.id = this.route.snapshot.params['postId'];
this.postService.findById(this.id).subscribe((data:Post)=>{
  this.post = data;
})
  }

}
