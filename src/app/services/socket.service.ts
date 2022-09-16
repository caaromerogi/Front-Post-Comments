import { Injectable } from '@angular/core';

import {webSocket, WebSocketSubject} from 'rxjs/webSocket'
import { CommentType, Post } from './models';
@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor() { }
  toPostView():WebSocketSubject<Post>{
    return webSocket('WSS://gamma-post-comments.herokuapp.com/retrieve/mainSpace');
  }

  toComment(postId:string|null):WebSocketSubject<CommentType>{
    return webSocket(`WSS://gamma-post-comments.herokuapp.com//retrieve//${postId}`)
  }
}
