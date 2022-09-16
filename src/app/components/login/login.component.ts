import { Token } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebSocketSubject } from 'rxjs/webSocket';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpRquestsService } from 'src/app/services/http-rquests.service';
import { CommentType } from 'src/app/services/models';
import { StateService } from 'src/app/services/state/state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService:AuthService, private router:Router
    ,private state:StateService, private requestService:HttpRquestsService) { }

  ngOnInit(): void {
  }

  async loginWithGoogle(){
    const response = await this.authService.logInWithGoogle()
    if(response){
      console.log(response)
      this.requestService.loginMethod({
        username:response.user.email,
        password:response.user.email
      }).subscribe(token =>{
        console.log("hola soy el token: "+token.access_token)
        this.state.state.next({
          loggedIn:true,
          authenticatedPerson:response,
          token: token.access_token
        })
      })
      this.router.navigateByUrl('/home');
    }
  }

}
