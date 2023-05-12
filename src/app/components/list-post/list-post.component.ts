import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.css']
})
export class ListPostComponent implements OnInit {
  tabPost!: any
  index: any
  constructor(private postService: PostService, private router: Router, private route: ActivatedRoute) { }
  ngOnInit(): void {
    this.postes()
  }


  postes() {
    this.postService.listPosts().subscribe(
      (response: any) => {
        this.tabPost = response
      },
      (error: any) => {
        console.log(error);

      }
    )
  }

  supp(post: any) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Your file has been deleted.',
          'success'
        )
        this.postService.deletePost(post.id)
          .subscribe((response: any) => {
            console.log("deleted success");
            this.ngOnInit()
          }, (error: any) => {
            console.log(error);

          })
      }
    })
  }

  modifier(post: any) {
    this.router.navigate([post.id], { relativeTo: this.route })
  }
}
