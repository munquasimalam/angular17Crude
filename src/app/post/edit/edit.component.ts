import { Component } from '@angular/core';
import { Post } from '../post';
import { PostService } from '../post.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent {
  id!: number;
  post!: Post;
  form!: FormGroup;
  constructor(
    public postService: PostService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.params['postId'];
    console.log("id:"+this.id);
    this.postService.findById(this.id).subscribe((data: Post) => {
      console.log("data:"+data);
      this.post = data;
     
    });
    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      body: new FormControl('', [Validators.required]),
    });
  }
  get f() {
    return this.form.controls;
  }
  submit(){
    console.log(this.form.value);
    this.postService.update(this.id,this.form.value).subscribe((res:any)=>{
      alert("Updated successfully...");
      this.router.navigateByUrl('/post/index/');
    })
  }
}
