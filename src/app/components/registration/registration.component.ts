import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(
    private http : HttpClient
  ) { }

  ngOnInit(): void {
  }

  psw="";
  userName="";
  urlAggiungi="http://santaniellofrancesco.altervista.org/angularChat/api/account/createAccount.php";

  @Output() regClose: EventEmitter<any> = new EventEmitter<any>();

  prova(){

    this.http
      .post(this.urlAggiungi, {
        psw : this.psw,
        name : this.userName
      })
      .subscribe((res) => {
        console.log(res);
      });

    this.regClose.emit();
  }
}
