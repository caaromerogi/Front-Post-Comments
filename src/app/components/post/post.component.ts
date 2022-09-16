import { Component, OnInit } from '@angular/core';
import { CommentType, Post } from 'src/app/services/models';
import {Input } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';
import { WebSocketSubject } from 'rxjs/webSocket';
import { HttpRquestsService } from 'src/app/services/http-rquests.service';
import { Route } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @Input() post?:Post;

  postId:string|undefined;
  
  newAuthor:string = "";
  newContent:string="";

  comments?:CommentType[];

  socketManagerComment?:WebSocketSubject<CommentType>;

  constructor(private request:HttpRquestsService, private socket:SocketService) { }

  ngOnInit(): void {

  }


}
