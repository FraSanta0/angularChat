import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-username',
  templateUrl: './username.component.html',
  styleUrls: ['./username.component.css']
})
export class UsernameComponent implements OnInit {
  @Output() userNameEvent = new EventEmitter<{name:string, ID_account:string}>();

  userName ="";
  psw ="";
  urlAccount="http://santaniellofrancesco.altervista.org/angularChat/api/account/readAccountPsw.php";
  accountList = { ID_account: 0, name: "", avatar: "", mail: "", psw: ""};
  registrazione=false;

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit(): void {
  }

  setUserName() : void{
    this.http.get<any>(this.urlAccount+"?name="+this.userName+"&psw="+this.psw).subscribe((response) => {
      this.accountList=response;
      console.log(this.accountList);
      let id_account= this.accountList.ID_account.toString();
      let pack = {name:this.accountList.name,ID_account:id_account};
      this.userNameEvent.emit(pack);
    });
  }

  openRegistration(): void{
    this.registrazione=true;
  }

  regChange(){
    this.registrazione=false;
  }

}
