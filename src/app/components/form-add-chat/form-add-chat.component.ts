import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';

@Component({
  selector: 'app-form-add-chat',
  templateUrl: './form-add-chat.component.html',
  styleUrls: ['./form-add-chat.component.css']
})
export class FormAddChatComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  addChat(f: NgForm){
    console.log(f.value);
  }

}
