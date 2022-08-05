import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  userName = '';
  message = '';
  connected=false;
  id_listachat?: number;
  ID_account=0;
  messageList: { message: string; id_account: number; date?: string; time?: string}[] = [];
  userList: {userName: string, room:number}[] = [];
  socket: any;
  pipe : DatePipe = new DatePipe('en-US');

  constructor(
    private http: HttpClient
    ) {}

  ngOnInit(): void {
    this.downloadMessages();
    if(sessionStorage.getItem('userName')){
      this.userName=sessionStorage.getItem('userName')!;
      this.ID_account=parseInt(sessionStorage.getItem('ID_account')!);
      console.log(sessionStorage.getItem('userName'));
    }
  }

  urlAggiungi =
    'http://santaniellofrancesco.altervista.org/angularChat/api/addMessage.php';
  messagesUrl =
    'http://santaniellofrancesco.altervista.org/angularChat/api/readMessageAll.php';
    messageUrlListachat =
    'http://santaniellofrancesco.altervista.org/angularChat/api/readMessageListachat.php';

  userNameUpdate(pack: { name: string; ID_account: string }): void {

    this.userName = pack.name;
    this.ID_account = parseInt(pack.ID_account);
    console.log(this.userName);
    sessionStorage.setItem('userName', this.userName);
    sessionStorage.setItem('ID_account', pack.ID_account);

    //this.downloadMessages();
  }

  sendMessage(): void {
    this.socket.emit('message', {msg:this.message, date:this.pipe.transform(new Date, 'dd/MM/yyyy')?.toString(), time:this.pipe.transform(new Date, 'h:mm')?.toString()});
    this.messageList.push({
      message: this.message,
      id_account: this.ID_account,
      date:  this.pipe.transform(new Date, 'dd/MM/yyyy')?.toString(),
      time: this.pipe.transform(new Date, 'h:mm')?.toString()
    });
    //-----------------------------

    this.http
      .post(this.urlAggiungi, {
        message: this.message,
        id_account: this.ID_account,
        date:  this.pipe.transform(new Date, 'dd/MM/yyyy')?.toString(),
        time: this.pipe.transform(new Date, 'h:mm')?.toString()
      })
      .subscribe((res) => {
        console.log(res);
      });

    //----------------------------
    this.message = '';
    console.log(this.messageList);
    console.log(this.pipe.transform(new Date, 'h:mm'));
  }

  downloadMessages(id_chat?: number) {
    if (this.userName) {
      console.log(id_chat);
      this.id_listachat=id_chat;
      let queryParams = new HttpParams().append('id_listachat',id_chat!.toString());
      this.http.get<any>(this.messageUrlListachat,{params:queryParams}).subscribe((response) => {
        this.messageList=response.body;
        console.log(this.messageList);
      });
    }
  }

  stanza(room: number){
    if(this.connected){
      this.disconnect();
    }
    this.connected=true;
    this.socket = io.io('localhost:3000?id_account=' + this.ID_account);
    this.socket.emit('set-user-name', this.userName);
    console.log(this.userList);
    this.socket.emit('create',room);
    this.downloadMessages(room);
    this.socket.on('user-list', (userList: {userName: string, room: number}[]) => {
      this.userList = userList;
    });

    this.socket.on(
      'message-broadcast',
      (data: { message: string; id_account: number; date: string; time: string}) => {
        if (data) {
          this.messageList.push({
            message: data.message,
            id_account: data.id_account,
            date:  data.date,
            time: data.time
          });
          console.log(data);
        }
      }
    );

    this.socket.on(
      'message2',
      (data: { message: string; id_account: number; date: string; time: string}) => {
        if (data) {
          this.messageList.push({
            message: data.message,
            id_account: data.id_account,
            date:  data.date,
            time: data.time
          });
          console.log(data);
        }
      }
    );
  }

  messaggioStanza(){
    this.socket.emit('messageRoom', {msg:this.message, date:this.pipe.transform(new Date, 'dd/MM/yyyy')?.toString(), time:this.pipe.transform(new Date, 'h:mm')?.toString()});
    this.messageList.push({
      message: this.message,
      id_account: this.ID_account,
      date:  this.pipe.transform(new Date, 'dd/MM/yyyy')?.toString(),
      time: this.pipe.transform(new Date, 'h:mm')?.toString()
    });

    this.http
      .post(this.urlAggiungi, {
        message: this.message,
        id_account: this.ID_account,
        date:  this.pipe.transform(new Date, 'dd/MM/yyyy')?.toString(),
        time: this.pipe.transform(new Date, 'h:mm')?.toString(),
        id_listachat: this.id_listachat
      })
      .subscribe((res) => {
        console.log(res);
      });

      this.message = '';
  }

  disconnect(){
    this.socket.emit('disconnected',null);
  }
}
