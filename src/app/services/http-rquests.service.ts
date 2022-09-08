import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';
import { CreatePostCommand, Post } from './models';

@Injectable({
  providedIn: 'root'
})
export class HttpRquestsService {

  constructor(private client:HttpClient) { }

  httpOptions ={
    headers: new HttpHeaders({'Content-type':'application/json'})
  }

  getAllPosts(): Observable<Post[]>{
    return this.client.get<Post[]>('http://localhost:8081/get/AllPosts');
  }

  createPostAction(command:CreatePostCommand):Observable<Object>{
    return this.client.post('http://localhost:8080/create/post', command, this.httpOptions);
  }
}
