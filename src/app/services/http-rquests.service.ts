import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import { CommentType, CreatePostCommand, Post } from './models';
import { ErrorHandlerService } from './error-service/error-handler.service';
import { catchError } from 'rxjs';

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
    return this.client.get<Post[]>('https://beta-post-comments.herokuapp.com/get/AllPosts');
  }


  getPostById(postId:string|null):Observable<Post>{
    return this.client.get<Post>(`https://beta-post-comments.herokuapp.com/get/post/${postId}`)
  }

  createPostAction(command:CreatePostCommand, token:string):Observable<Object>{
    return this.client.post('https://alpha-post-comments.herokuapp.com/create/post', command, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      })})
  }

  createCommentAction(command:CommentType, token:string){
    return this.client.post('https://alpha-post-comments.herokuapp.com/add/comment', command, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      })});
  }

  loginMethod(command:any){
    return this.client.post<any>('https://alpha-post-comments.herokuapp.com/auth/login', command, this.httpOptions);
  }

  
}

