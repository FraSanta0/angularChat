import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-add-chat',
  templateUrl: './form-add-chat.component.html',
  styleUrls: ['./form-add-chat.component.css']
})
export class FormAddChatComponent implements OnInit {

  constructor(
    private route : Router,
    private http : HttpClient
  ) { }

  urlAggiungi=
    "http://santaniellofrancesco.altervista.org/angularChat/api/listachat/addListachat.php";

  ngOnInit(): void {
  }

  addChat(f: NgForm){
    console.log(f.value.name);

    this.http
      .post(this.urlAggiungi, {
        nome: f.value.name
      })
      .subscribe((res) => {
        console.log(res);
      });

    this.route.navigateByUrl('main');
  }

}
