import { Component, OnInit } from '@angular/core';
import { HttpRquestsService } from 'src/app/services/http-rquests.service';
import { SocketService } from 'src/app/services/socket.service';
import { Post, CreatePostCommand, PostView, CommentView, CommentType } from 'src/app/services/models';
import { Observable } from 'rxjs';
import { WebSocketSubject } from 'rxjs/webSocket';
import { Router } from '@angular/router';
import { StateService } from 'src/app/services/state/state.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  posts?:Post[]

  newTitle:string = "";
  newAuthor:string = "";

  availableState:any;
  
  socketManagerPost?:WebSocketSubject<Post>;

  
  constructor(private request:HttpRquestsService, private socket:SocketService,
    private router:Router, private state:StateService) { }

  ngOnInit(): void {
      if(this.validateLogin()){
        this.getAllPosts();
        this.getSocketPostData();
      }
      
  }

  validateLogin():boolean{
    let validationResult = false;
    this.state.state.subscribe(currentState => {
      this.availableState = currentState;
      if(!currentState.loggedIn){
          this.router.navigateByUrl('/login')
          validationResult = false
          return
      }
      validationResult = true
    })    
    return validationResult;
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
  
      this.request.createPostAction(newCommand, this.availableState.token).subscribe();

      this.newTitle='';
      this.newAuthor='';
      
  }

  getSocketPostData(){
    this.socketManagerPost = this.socket.toPostView();
    this.socketManagerPost.subscribe({
      next: ((post) => {
        this.posts?.unshift(post)
      }),
      error: ((err:any) => {
        console.log('An error occurred with socket connection to gamma, try it later or reload the page')
      })
    })
  }

  closeSocketPost(){
    this.socketManagerPost?.complete();
  }


  // getSocketCommentData(){
    //post => this.posts?.unshift(post)
  //   this.socketManagerComment = this.socket.toComment();
  //   this.socketManagerComment.subscribe(comment => this.comments)
  // }

  

}
