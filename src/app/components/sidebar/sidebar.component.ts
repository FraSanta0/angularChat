import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(
    private route : Router,
    private http : HttpClient
  ) { }
  @Output() eventEmitter: EventEmitter<number> = new EventEmitter<number>();

  ngOnInit(): void {
    this.downloadListachat();
  }

  userName="provaMittente";
  listachatUrl=
  "http://santaniellofrancesco.altervista.org/angularChat/api/listachat/readListachatAll.php";
  listaChat : {ID_listachat:string, nome: string, dataCreazione:string, descrizione: string}[] = [];

  emitChat(id_chat: number){
    this.eventEmitter.emit(id_chat);
  }

  openAddChat(){
    this.route.navigateByUrl('/addChat');
  }

  downloadListachat(){
    this.http.get<any>(this.listachatUrl).subscribe((response) => {
      this.listaChat=response.body;
      console.log(this.listaChat);
    });
  }
}
