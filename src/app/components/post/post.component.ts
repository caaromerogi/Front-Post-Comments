import { Component, OnInit } from '@angular/core';
import { CommentType, Post } from 'src/app/services/models';
import {Input } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';
import { WebSocketSubject } from 'rxjs/webSocket';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() post?:Post

  postId:string|undefined;

  comments?:CommentType[];

  socketManagerComment?:WebSocketSubject<CommentType>;

  constructor(private socket:SocketService) { }

  ngOnInit(): void {
    this.getSocketCommentData();
  }
  
  getSocketCommentData(){
    this.comments = this.post?.comments;
    this.postId = this.post?.aggregateId;
    this.socketManagerComment = this.socket.toComment(this.postId);
    this.socketManagerComment.subscribe(comment => this.comments?.unshift(comment));
  }

  closeCommentSocket(){
    this.socketManagerComment?.complete();
  }

}
