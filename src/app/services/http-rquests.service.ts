import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import { CommentType, CreatePostCommand, Post } from './models';

@Injectable({
  providedIn: 'root'
})
export class HttpRquestsService {
  //create post https://alpha-post-comments.herokuapp.com
  //https://alpha-post-comments.herokuapp.com
  //https://alpha-post-comments.herokuapp.com
  constructor(private client:HttpClient) { }

  httpOptions ={
    headers: new HttpHeaders({'Content-type':'application/json'})
  }

  getAllPosts(): Observable<Post[]>{
    return this.client.get<Post[]>('https://beta-post-comments-start.herokuapp.com/get/AllPosts');
  }

  getPostById(postId:string|null):Observable<Post>{
    return this.client.get<Post>(`https://beta-post-comments-start.herokuapp.com/get/post/${postId}`)
  }

  createPostAction(command:CreatePostCommand, token:string):Observable<Object>{
    return this.client.post('http://localhost:8080/create/post', command, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      })})
  }

  createCommentAction(command:CommentType){
    return this.client.post('http://localhost:8080/add/comment', command, this.httpOptions);
  }

  loginMethod(command:any){
    return this.client.post<any>('http://localhost:8080/auth/login', command, this.httpOptions);
  }
}
