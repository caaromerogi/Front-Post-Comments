import { Injectable } from '@angular/core';

import {webSocket, WebSocketSubject} from 'rxjs/webSocket'
import { CommentType, Post } from './models';
@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor() { }
  toPostView():WebSocketSubject<Post>{
    return webSocket('ws://localhost:8082/retrieve/mainSpace');
  }

  toComment(postId:string|undefined):WebSocketSubject<CommentType>{
    return webSocket(`ws://localhost:8082//retrieve//${postId}`)
  }
}
