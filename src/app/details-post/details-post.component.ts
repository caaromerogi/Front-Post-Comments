import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WebSocketSubject } from 'rxjs/webSocket';
import { HttpRquestsService } from '../services/http-rquests.service';
import { CommentType, Post } from '../services/models';
import { SocketService } from '../services/socket.service';
import { StateService } from '../services/state/state.service';

@Component({
  selector: 'app-details-post',
  templateUrl: './details-post.component.html',
  styleUrls: ['./details-post.component.css']
})
export class DetailsPostComponent implements OnInit {

  newAuthor:string = "";
  newContent:string="";

  comments?:CommentType[];

  socketManagerComment?:WebSocketSubject<CommentType>;

  availableState:any;
  post?:Post;

  constructor(private route:ActivatedRoute, private location:Location
    ,private router:Router, private state:StateService, private client:HttpRquestsService,
    private socket:SocketService) { }

  ngOnInit(): void {

    if(this.validateLogin()){
      this.getPost()
      this.getSocketCommentData()
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

  getPost(){
    this.client.getPostById(this.route.snapshot.paramMap.get('id')).subscribe(
      post => {
        console.log(post)
        this.post = post
        this.comments = this.post.comments
      }
    )
  }
  
  // getComments(){
  //   this.comments = this.post?.comments;
  //   this.postId = this.post?.aggregateId;
  // }
  
  getSocketCommentData(){
    this.socketManagerComment = this.socket.toComment(this.route.snapshot.paramMap.get('id'));
    this.socketManagerComment.subscribe(comment => this.comments?.push(comment));
  }

  closeCommentSocket(){
    this.socketManagerComment?.complete();
  }

  submitComment(){
    const newCommand:CommentType ={
      commentId:Math.floor(Math.random()*1000).toString(),
      postId:this.post?.aggregateId,
      author: this.newAuthor,
      content: this.newContent
    }

    this.client.createCommentAction(newCommand, this.availableState.token).subscribe();

    this.newAuthor='';
    this.newContent='';
  }




}
