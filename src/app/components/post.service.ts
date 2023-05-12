import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  url = "http://localhost:3000/posts"
  constructor(private http: HttpClient) { }
  add(data: any) {
    return this.http.post(this.url, data)
  }
  listPosts() {
    return this.http.get(this.url)
  }
  deletePost(id: any) {
    return this.http.delete(this.url + '/' + id)
  }
  getUserById(id: any) {
    return this.http.get(this.url + '/' + id)
  }
  updatePost(user: any, id: any) {
    return this.http.put(this.url + '/' + id, user)
  }
}
