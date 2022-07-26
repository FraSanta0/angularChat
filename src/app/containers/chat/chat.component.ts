import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  userName = '';
  message = '';
  messageList: { message: string; userName: string; date?: string; time?: string}[] = [];
  userList: string[] = [];
  socket: any;
  pipe : DatePipe = new DatePipe('en-US');

  constructor(
    private http: HttpClient
    ) {}

  ngOnInit(): void {
    this.downloadMessages();
  }

  urlAggiungi =
    'http://santaniellofrancesco.altervista.org/angularChat/api/addMessage.php';
  messagesUrl =
    'http://santaniellofrancesco.altervista.org/angularChat/api/readMessageAll.php';

  userNameUpdate(name: string): void {
    this.socket = io.io('localhost:3000?userName=' + name);
    this.userName = name;
    console.log(this.userName);

    this.socket.emit('set-user-name', name);

    this.socket.on('user-list', (userList: string[]) => {
      this.userList = userList;
    });

    this.socket.on(
      'message-broadcast',
      (data: { message: string; userName: string; date: string; time: string}) => {
        if (data) {
          this.messageList.push({
            message: data.message,
            userName: data.userName,
            date:  data.date,
            time: data.time
          });
        }
      }
    );

    this.downloadMessages();
  }

  sendMessage(): void {
    this.socket.emit('message', this.message);
    this.messageList.push({
      message: this.message,
      userName: this.userName,
      date:  this.pipe.transform(new Date, 'dd/MM/yyyy')?.toString(),
      time: this.pipe.transform(new Date, 'h:mm')?.toString()
    });
    //-----------------------------

    this.http
      .post(this.urlAggiungi, {
        message: this.message,
        userName: this.userName,
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

  downloadMessages() {
    if (this.userName) {
      this.http.get<any>(this.messagesUrl).subscribe((response) => {
        this.messageList=response.body;
        console.log(this.messageList);
      });
    }
  }
}
