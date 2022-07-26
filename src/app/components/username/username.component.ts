import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-username',
  templateUrl: './username.component.html',
  styleUrls: ['./username.component.css']
})
export class UsernameComponent implements OnInit {
  @Output() userNameEvent = new EventEmitter<string>();

  userName ="";
  psw ="";
  urlAccount="http://santaniellofrancesco.altervista.org/angularChat/api/account/readAccountPsw.php";
  accountList = { ID_account: 0, name: "", avatar: "", mail: "", psw: ""};

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
  }

  setUserName() : void{
    this.http.get<any>(this.urlAccount+"?psw="+this.psw).subscribe((response) => {
      this.accountList=response;
      console.log(this.accountList);
      this.userNameEvent.emit(this.accountList.name);
    });
  }

}
