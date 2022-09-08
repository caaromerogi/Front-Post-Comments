import { Component, Input, OnInit } from '@angular/core';
import { CommentType } from 'src/app/services/models';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() comment?:CommentType
  
  constructor() { }

  ngOnInit(): void {
  }


}
