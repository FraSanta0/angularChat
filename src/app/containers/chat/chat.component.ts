import { Component, OnInit } from '@angular/core';
import * as io from 'socket.io-client';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit {
  userName = '';
  message = '';
  messageList: { message: string; userName: string; mine: boolean }[] = [];
  userList: string[] = [];
  socket: any;

  constructor(private http: HttpClient) {}

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
      (data: { message: string; userName: string }) => {
        if (data) {
          this.messageList.push({
            message: data.message,
            userName: data.userName,
            mine: false,
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
      mine: true,
    });
    //-----------------------------

    this.http
      .post(this.urlAggiungi, {
        message: this.message,
        userName: this.userName,
      })
      .subscribe((res) => {
        console.log(res);
      });

    //----------------------------
    this.message = '';
    console.log(this.messageList);
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
