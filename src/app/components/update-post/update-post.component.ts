import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from '../post.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.css'],
})
export class UpdatePostComponent implements OnInit {
  update!: FormGroup;
  index: any;
  today = new Date();
  createdAt = '';
  constructor(
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((param: ParamMap) => {
      let id = parseInt(param.get('id') || '');
      this.index = id;
    });
    this.postService.getUserById(this.index).subscribe(
      (response: any) => {
        this.update.patchValue(response);
        this.createdAt = response.createdAt;
      },
      (error: any) => {
        console.log(error);
      }
    );
    this.update = new FormGroup({
      titre: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      description: new FormControl('', [Validators.required]),
      categorie: new FormControl('', [Validators.required]),
      createdAt: new FormControl(this.createdAt),
    });
  }

  get titre() {
    return this.update.get('titre');
  }
  get description() {
    return this.update.get('description');
  }
  get categorie() {
    return this.update.get('categorie');
  }

  updateData() {
    this.postService.updatePost(this.update.value, this.index).subscribe(
      (response) => {
        console.log('success');
        this.update.reset();
        this.ngOnInit();
        this.router.navigate(['/list']);
        this.toastr.success('Post updated', 'Success!');
      },
      (error: any) => {
        console.log(error);
        this.toastr.success('Post not updated', 'Error!');
      }
    );
  }
}
