import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StateService {
  initialState = {
    loggedIn:false, //CAMBIAR A FALSE
    authenticatedPerson:{},
    token:{}
  }
  
  state = new BehaviorSubject(this.initialState);

  constructor() { }
}
