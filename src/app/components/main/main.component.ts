import { Component, OnInit } from '@angular/core';
import { HttpRquestsService } from 'src/app/services/http-rquests.service';
import { SocketService } from 'src/app/services/socket.service';
import { Post, CreatePostCommand, PostView, CommentView, CommentType } from 'src/app/services/models';
import { Observable } from 'rxjs';
import { WebSocketSubject } from 'rxjs/webSocket';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  posts?:Post[]

  newTitle:string = "";
  newAuthor:string = "";
  
  socketManagerPost?:WebSocketSubject<Post>;

  
  constructor(private request:HttpRquestsService, private socket:SocketService) { }

  ngOnInit(): void {
      this.getAllPosts();
      this.getSocketPostData();
      
  }

  getAllPosts(){
    this.request.getAllPosts().subscribe(posts =>
      this.posts = posts
      )
  }

  submitPost(){
      const newCommand:CreatePostCommand ={
        postId:Math.floor(Math.random()*1000).toString(),
        title: this.newTitle,
        author:this.newAuthor
      }

      this.request.createPostAction(newCommand).subscribe();

      this.newTitle='';
      this.newAuthor='';
      
  }

  getSocketPostData(){
    this.socketManagerPost = this.socket.toPostView();
    this.socketManagerPost.subscribe(post => this.posts?.unshift(post))
  }

  closeSocketPost(){
    this.socketManagerPost?.complete();
  }


  // getSocketCommentData(){
  //   this.socketManagerComment = this.socket.toComment();
  //   this.socketManagerComment.subscribe(comment => this.comments)
  // }

  

}
