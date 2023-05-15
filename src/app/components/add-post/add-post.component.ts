import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from '../post.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css'],
})
export class AddPostComponent implements OnInit {
  addition!: FormGroup;
  today = new Date();
  dat =
    this.today.getDate() +
    '/' +
    this.today.getMonth() +
    '/' +
    this.today.getFullYear() +
    ' at ' +
    this.today.getHours() +
    ':' +
    this.today.getMinutes();
  constructor(
    private postService: PostService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.addition = new FormGroup({
      titre: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
      ]),
      description: new FormControl('', [Validators.required]),
      categorie: new FormControl('', [Validators.required]),
      createdAt: new FormControl(this.dat),
    });
  }
  get titre() {
    return this.addition.get('titre');
  }
  get description() {
    return this.addition.get('description');
  }
  get categorie() {
    return this.addition.get('categorie');
  }
  addArticle() {
    this.postService.add(this.addition.value).subscribe(
      (response: any) => {
        this.router.navigateByUrl('/list');
        this.toastr.success('Post added successfully', 'Success!');
      },
      (error: any) => {
        this.toastr.error('Post not added!', 'Error!');
      }
    );
  }
}
